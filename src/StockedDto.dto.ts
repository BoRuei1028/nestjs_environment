import { ApiProperty } from "@nestjs/swagger";

export class StockedDto {
  @ApiProperty({
    description: '工單 index',
    example: 17
  })
  id: number;
  @ApiProperty({
    description: '工單號碼',
    example: ""
  })
  serialNum: string;

  @ApiProperty({
    description: '商品品號',
  })
  productId: string;

  @ApiProperty({
    description:
    `工單生產狀態:
    0 => 未開始(UnProduction)
    1 => 生產中(InProduction)
    2 => 暫停(Suspend)
    3 => 已完成(Completed)
    4 => 未完成(Incomplete)`
    ,
    enum: [
      "UnProduction",
      "InProduction",
      "Suspend",
      "Completed",
      "Incomplete"
    ],
    default: 0
  })
  productionStatus: string;

  @ApiProperty({
    description: '預計生產數量',
    default: "0.00"
  })
  purchaseQuantity: string;

  @ApiProperty({
    description: '已生產數量',
    default: "0.00"
  })
  producedQuantity: string;

  @ApiProperty({
    description: '預計生產重量',
    default: "0.00"
  })
  purchaseWeight: string;

  @ApiProperty({
    description: '已生產重量',
    default: "0.00"
  })
  producedWeight: string;

  @ApiProperty({
    description: '預計完工日',
    example: "2022-07-20"
  })
  estimatedCompletionDate: string;

  @ApiProperty({
    description: '預計交貨日',
    example: "2022-07-20"
  })
  estimatedDeliveryDate: string;

  @ApiProperty({
    description: '實際完工日',
    example: "2022-07-20"
  })
  realCompletionDate: string;
}
