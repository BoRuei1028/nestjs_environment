import { ApiProperty } from '@nestjs/swagger';

export class CreateStockRecord {
  @ApiProperty({
    example: '200.05',
    description: '入庫重量'
  })
  weight: number

  @ApiProperty({
    example: '400.1',
    description: '入庫數量，由重量去換算而得'
  })
  quantity: number

  @ApiProperty({
    example: 'ZB1105-120622',
    description: '生產批號'
  })
  lotNumber: string

  @ApiProperty({
    example: 'ZB1105-120622',
    description: '倉儲位編號'
  })
  storageNumber: string
}