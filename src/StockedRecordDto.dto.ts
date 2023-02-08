import { ApiProperty } from "@nestjs/swagger";

export class StockedRecordDto {

  @ApiProperty({
    description: '入庫紀錄 index',
    example: 17
  })
  id: number;

  @ApiProperty({
    description: '入庫重量',
    example: 200.99
  })
  weight: string

  @ApiProperty({
    description: '入庫數量',
    example: 2000.09
  })
  quantity: string

  @ApiProperty({
    description: '生產批號',
    example: 'ZB1105-120622'
  })
  lotNumber: string

  @ApiProperty({
    description: '倉儲位編號',
    example: 'ZB1105-120622'
  })
  storageNumber: string

  @ApiProperty({
    description: '入庫時間',
    example: '2021-06-05'
  })
  createAt: string
}