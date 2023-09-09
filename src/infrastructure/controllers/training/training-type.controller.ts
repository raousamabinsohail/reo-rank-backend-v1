import { Controller, Get, Put, Post, Delete, Query, Body, UsePipes, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericResponse } from 'src/domain/dto/generic';
import { JoiValidationPipe } from 'src/infrastructure/pipes/joi-validation.pipe';
import { Secured } from 'src/domain/user-auth/decorators/authorization.decorator';
import { TrainingTypeService } from 'src/usecase/services/training/training-type.service';
import { TrainingType, UpdateTrainingType } from 'src/domain/training/dto/training-type.dto';
import { createTrainingTypeValidator, updateTrainingTypeValidator } from './training.validator';

@Controller('training-type')
@ApiTags('Training Type')
@ApiBearerAuth()
export class TrainingTypeController {

    constructor(private TrainingTypeService: TrainingTypeService) { }


    /**
     *Create a new TrainingType 
     *
     * @param {TrainingType} TrainingType
     * @return {*}  {Promise<GenericResponse<TrainingType>>}
     * @memberof TrainingTypeController
     */
    @Post('')
    @UsePipes(new JoiValidationPipe(createTrainingTypeValidator)) //validating the object
    public async create(@Body() TrainingType: TrainingType): Promise<GenericResponse<TrainingType>> {
        return this.TrainingTypeService.create(TrainingType);
    }


    /**
     *Get all available TrainingTypes
     *
     * @param {number} offset
     * @param {number} page
     * @return {*}  {Promise<GenericResponse<TrainingType[]>>}
     * @memberof TrainingTypeController
     */
    @Post('/get')
    public async getAll(@Query('offset') offset: number, @Query('page') page: number): Promise<GenericResponse<TrainingType[]>> {
        return this.TrainingTypeService.getAll(page, offset);
    }


    /**
     *Get specific TrainingType  by id
     *
     * @param {string} _id
     * @return {*}  {Promise<GenericResponse<TrainingType>>}
     * @memberof TrainingTypeController
     */
    @Get('/:id')
    public async getOne(@Param('id') _id: string): Promise<GenericResponse<TrainingType>> {
        return this.TrainingTypeService.getOne(_id);
    }


    /**
     *Update an existing TrainingType 
     *
     * @param {UpdateTrainingType} updateTrainingType
     * @return {*}  {Promise<GenericResponse<TrainingType>>}
     * @memberof TrainingTypeController
     */
    @Put('')
    @UsePipes(new JoiValidationPipe(updateTrainingTypeValidator)) //validating the object
    public async update(@Body() updateTrainingType: UpdateTrainingType): Promise<GenericResponse<TrainingType>> {
        return this.TrainingTypeService.update(updateTrainingType);
    }


    /**
     *Delete an existing TrainingType 
     *
     * @param {string} id
     * @return {*}  {Promise<GenericResponse<any>>}
     * @memberof TrainingTypeController
     */
    @Delete('/')
    public async delete(@Param('id') id: string): Promise<GenericResponse<any>> {
        return this.TrainingTypeService.delete(id);
    }

}
