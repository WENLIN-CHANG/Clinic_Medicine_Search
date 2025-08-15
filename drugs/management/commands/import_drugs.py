import json
from django.core.management.base import BaseCommand
from django.conf import settings
from drugs.models import Drug


class Command(BaseCommand):
    help = '匯入藥物資料從JSON檔案到資料庫'

    def add_arguments(self, parser):
        parser.add_argument(
            '--file',
            type=str,
            default='data/drugs.json',
            help='JSON檔案路徑 (預設: data/drugs.json)'
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='清除現有資料後再匯入'
        )

    def handle(self, *args, **options):
        json_file = options['file']
        clear_data = options['clear']
        
        # 建立完整路徑
        from pathlib import Path
        json_path = Path(settings.BASE_DIR) / json_file
        
        if not json_path.exists():
            self.stdout.write(
                self.style.ERROR(f'檔案不存在: {json_path}')
            )
            return

        # 清除現有資料
        if clear_data:
            Drug.objects.all().delete()
            self.stdout.write(
                self.style.WARNING('已清除所有現有藥物資料')
            )

        # 讀取JSON檔案
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                drugs_data = json.load(f)
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'讀取檔案失敗: {e}')
            )
            return

        # 匯入資料
        created_count = 0
        updated_count = 0
        
        for drug_data in drugs_data:
            # 移除原始id，讓Django自動生成
            drug_id = drug_data.pop('id', None)
            
            # 檢查是否已存在相同的藥物
            existing_drug = Drug.objects.filter(
                name_zh=drug_data['name_zh'],
                name_en=drug_data['name_en']
            ).first()
            
            if existing_drug:
                # 更新現有資料
                for field, value in drug_data.items():
                    setattr(existing_drug, field, value)
                existing_drug.save()
                updated_count += 1
                self.stdout.write(f'更新: {existing_drug.name_zh}')
            else:
                # 建立新資料
                drug = Drug.objects.create(**drug_data)
                created_count += 1
                self.stdout.write(f'建立: {drug.name_zh}')

        # 顯示結果
        self.stdout.write(
            self.style.SUCCESS(
                f'匯入完成！建立 {created_count} 筆，更新 {updated_count} 筆'
            )
        )