import { BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { AuthSignupDto } from '@/modules/auth/dto/auth-signup.dto';
import { AuthLoginDto } from '@/modules/auth/dto/auth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signup(@Body() authSignupDto: AuthSignupDto) {
        try {
            const { email, username, password } = authSignupDto;
            if (!email || !username || !password) {
                throw new BadRequestException('Validation failed');
            }

            const result = await this.authService.signup(authSignupDto);
            if (!result) {
                throw new BadRequestException('Something went wrong');
            }
            return {
                statusCode: 201,
                message: 'Signup successfully',
                data: result,
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('login')
    @UsePipes(new ValidationPipe({ transform: true }))
    async login(@Body() authLoginDto: AuthLoginDto) {
        try {
            const { keyword, password } = authLoginDto;
            if (!keyword || !password) {
                throw new BadRequestException('Validation failed');
            }

            const result = await this.authService.login(authLoginDto);
            if (!result) {
                throw new BadRequestException('Something went wrong');
            }
            return {
                statusCode: 200,
                message: 'Login successfully',
                data: result,
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
