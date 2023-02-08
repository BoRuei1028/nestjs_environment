import { ApiProperty } from '@nestjs/swagger';

export class StockedProductDto {
  @ApiProperty({
    example: '200.05',
    description: '入庫重量'
  })
  id: number

  @ApiProperty({
    description: '單位淨重',
    example: 0.5
  })
  weight: number
}

  