import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the user',
  })
  id: number;

  @ApiProperty({
    example: 'User Name',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  email: string;
}
