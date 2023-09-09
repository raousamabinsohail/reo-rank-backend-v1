import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenericResponse } from 'src/domain/dto/generic';
import { Role, UpdateRoleDto } from 'src/domain/role/dto/role.dto';
import { Secured } from 'src/domain/user-auth/decorators/authorization.decorator';
import { RoleService } from 'src/usecase/services/role/role.service';



/**
 *Role controller to handle requests related to role
 *
 * @export
 * @class RoleController
 */
@Controller('role')
@ApiTags('Role')
@ApiBearerAuth()
export class RoleController {


    /**
     * Creates an instance of RoleController.
     * @param {RoleService} roleService
     * @memberof RoleController
     */
    constructor(private roleService: RoleService) { }


    /**
     *Get all roles
     *
     * @return {*}  {Promise<GenericResponse<Role[]>>}
     * @memberof RoleController
     */
    @Get('')
    @Secured("ROLE_MANAGEMENT", "r")
    public async getAll(): Promise<GenericResponse<Role[]>> {
        return this.roleService.getAll();
    }
 

    /**
     *Create a new role
     *
     * @param {Role} role
     * @return {*}  {Promise<GenericResponse<Role>>}
     * @memberof RoleController
     */
    @Post('')
    @Secured("ROLE_MANAGEMENT", "c")
    public async create(@Body() role: Role): Promise<GenericResponse<Role>> {
        return this.roleService.create(role);
    }


    /**
     *Update an existing role
     *
     * @param {UpdateRoleDto} role
     * @return {*}  {Promise<GenericResponse<null>>}
     * @memberof RoleController
     */
    @Put('')
    @Secured("ROLE_MANAGEMENT", "u")
    public async update(@Body() role: UpdateRoleDto): Promise<GenericResponse<null>> {
        return this.roleService.update(role);
    }


    /**
     *Delete an existing role
     *
     * @param {string} _id
     * @return {*}  {Promise<GenericResponse<null>>}
     * @memberof RoleController
     */
    @Delete('/:id')
    @Secured("ROLE_MANAGEMENT", "d")
    public async delete(@Param('id') id: string): Promise<GenericResponse<null>> {
        return this.roleService.delete(id);
    }
}
