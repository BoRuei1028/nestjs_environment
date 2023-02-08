import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { StockedProductDto } from "./StockedProductDto.dto";
import { StockedRecordDto } from "./StockedRecordDto.dto";

export class StockedDetailDto {
  @ApiProperty({
    description: '工單號碼',
    example: 17
  })
  dispatchId: number;
  @ApiProperty({
    description: '工單號碼',
    example: ""
  })
  serialNum: string;

  @ApiProperty({
    description: '商品資料',
    allOf: [
      {
        $ref: getSchemaPath(StockedProductDto)
      }
    ]
  })
  product: string;

  @ApiProperty({
    description: "工單生產狀態<br><br>0 => 未開始(UnProduction)<br><br>1 => 生產中(InProduction)<br><br>2 => 暫停中(Suspend)<br><br>3 => 已完成(Completed)<br><br>4 => 未完成(Incomplete)"
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
    default: 5000
  })
  purchaseQuantity: string;

  @ApiProperty({
    description: '已生產數量',
    default: 3500
  })
  producedQuantity: string;

  @ApiProperty({
    description: '未完成數量',
    default: 1500
  })
  unProducedQuantity: string;

  @ApiProperty({
    description: '已入庫數量',
    default: 0
  })
  stockedQuantity: string;

  @ApiProperty({
    description: '已完成為入庫數量',
    default: 0
  })
  unStockedQuantity: string;

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
    description: '未完成重量',
    default: "0.00"
  })
  unProducedWeight: string;

  @ApiProperty({
    description: '已入庫重量',
    default: "0.00"
  })
  stockedWeight: string;

  @ApiProperty({
    description: '已完成為入庫重量',
    default: "0.00"
  })
  unStockedWeight: string;

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
    type: [StockedRecordDto],
    description: '入庫歷史紀錄',
    items: {
      $ref: getSchemaPath(StockedRecordDto)
    }
  })
  record: StockedRecordDto[];


}
