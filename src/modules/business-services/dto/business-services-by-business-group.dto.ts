import { BusinessGroup } from 'src/modules/business-groups/entities/business-group.entity';
import { BusinessService } from '../entities/business-service.entity';
import { ApiProperty } from '@nestjs/swagger';

export class BusinessServicesByBusinessGroup {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty({ type: [BusinessService] })
  businessServices: BusinessService[];
}
