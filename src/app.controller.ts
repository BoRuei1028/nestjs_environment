import { Controller, Get, Param, Post, Body, Query, Delete, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, SwaggerModule, DocumentBuilder, SwaggerCustomOptions, ApiHeader, ApiResponse, ApiBadRequestResponse, ApiBasicAuth, ApiSecurity, ApiOperation, ApiQuery, ApiOkResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { StockedDetailDto } from './StockedDetail.dto';
import { CreateStockRecord } from './CreatedStockRecord.dto';
import { StockedDto } from './StockedDto.dto';
import { Redis } from 'ioredis'



// 添加標籤
@ApiTags('Stock')
@ApiExtraModels(StockedDetailDto)
@ApiExtraModels(StockedDto)
@ApiBasicAuth()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Put('api/redis/treasureValue')
  async modifyTreasureValue() {
    return this.appService.plusOneTreasureValue()
  }


  @Get('api/redis/get')
  async getRedisKey() {
    return this.appService.get()
  }


  @Post('api/redis/set')
  async setRedisKey() {
    return this.appService.set()
  }

  @Delete('api/redis/del')
  async delRedisKey() {
    return this.appService.del()
  }



  @Get('api/stocks/list')
  @ApiOperation({
    description: '取得可編輯入庫資料的工單清單'
  })
  @ApiHeader({
    name: 'token',
    description: '由api/auth/login 取得',
    required: true
  })
  @ApiOkResponse({
    description: '可編輯入庫資料的工單清單',
    //撰寫Schema
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          description: 'Http status code',
          example: 200,
        },
        success: {
          type: 'boolean',
          description: 'API 處理狀態',
          example: true,
        },
        message: {
          type: 'string',
          description: 'API 回覆訊息',
          example: 'Get dispatch successes.',
        },
        list: {
          type: 'array',
          description: '可輸入入庫資料的工單清單',
          items: {
            type: 'object',
            $ref: getSchemaPath(StockedDto)
          }
        },
        total: {
          type: 'number',
          description: '清單總筆數',
          example: 4
        }
      },
    },
  })
  getData() {
    return 'Get http://localhost:4000/api/stocks/list'
  }

  @Get('api/stocks')
  @ApiOperation({
    description: '取得單一可編輯入庫資料的工單資訊'
  })
  @ApiHeader({
    name: 'token',
    description: '由api/auth/login 取得',
    required: true
  })
  @ApiQuery({ //定義query欄位資訊
    name: 'dispatchId',
    type: 'number',
    description: '工單 index',
    required: true,
  })
  @ApiOkResponse({
    description: '單一可編輯入庫資料的工單資訊',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          description: 'Http status code',
          example: 200,
        },
        success: {
          type: 'boolean',
          description: 'API 處理狀態',
          example: true,
        },
        message: {
          type: 'string',
          description: 'API 回覆訊息',
          example: 'Get dispatch successes.',
        },
        detail: {
          type: 'object',
          description: '每張工單的入庫細節',
          $ref: getSchemaPath(StockedDetailDto),
        },
      },
    },
  })
  getList(@Query() query: { start: number, end: number }) {
    const { start, end } = query
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return list.slice(start, end)
  }


  @Post('api/stocks')
  @ApiOperation({
    description: '新增單一工單的入庫資訊'
  })
  @ApiHeader({
    name: 'token',
    description: '由api/auth/login 取得',
    required: true
  })
  @ApiQuery({ //定義query欄位資訊
    name: 'dispatchId',
    type: 'number',
    description: '工單 index',
    required: true,
  })
  @ApiOkResponse({
    description: '編輯成功',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          description: 'Http status code',
          example: 200,
        },
        success: {
          type: 'boolean',
          description: 'API 處理狀態',
          example: true,
        },
        message: {
          type: 'string',
          description: 'API 回覆訊息',
          example: 'Get dispatch successes.',
        },
        detail: {
          type: 'object',
          description: '每張工單的入庫細節',
          $ref: getSchemaPath(StockedDetailDto),
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: '工單號碼錯誤導致編輯失敗。',
    schema: {
      example: {
        statusCode: 400,
        success: false,
        message: 'Cannot find data by this id.',
      },
    },
  })
  createApp(@Body() data: CreateStockRecord) {
    return this.appService.createstockrecord(data)
  }

}




