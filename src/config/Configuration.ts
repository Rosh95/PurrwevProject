import * as dotenv from 'dotenv';

class Configuration {
  private static loadEnv() {
    const environment = [
      'development',
      'test',
      'production',
      'staging',
    ].includes(process.env.NODE_ENV)
      ? process.env.NODE_ENV
      : '';

    const envFilePath = environment ? ['.env', `.env.${environment}`] : '';
    dotenv.config({ path: envFilePath, override: true });
  }

  private static readEnvVariableWithDefault(
    variable: string,
    defaultValue: any,
  ) {
    return process.env[variable] || defaultValue;
  }

  private static getUrl(): string {
    return String(this.readEnvVariableWithDefault('DATABASE_URL', 'Database'));
  }

  private static getPasswordSalt(): number {
    return Number(this.readEnvVariableWithDefault('PASSWORD_SALT', 10));
  }

  private static getJwtSecret(): string {
    return String(this.readEnvVariableWithDefault('JWT_SECRET', '123456'));
  }

  private static getAccessJwtLifetime(): string {
    return String(
      this.readEnvVariableWithDefault('ACCESS_JWT_LIFETIME', '10h'),
    );
  }

  private static getRefreshJwtLifetime(): string {
    return String(
      this.readEnvVariableWithDefault('REFRESH_JWT_LIFETIME', '20h'),
    );
  }

  static getConfiguration() {
    Configuration.loadEnv();
    return {
      DATABASE_URL: Configuration.getUrl(),
      PASSWORD_SALT: Configuration.getPasswordSalt(),
      JWT_SECRET: Configuration.getJwtSecret(),
      ACCESS_JWT_LIFETIME: Configuration.getAccessJwtLifetime(),
      REFRESH_JWT_LIFETIME: Configuration.getRefreshJwtLifetime(),
    };
  }
}

export type ConfigType = ReturnType<typeof Configuration.getConfiguration>;

export default Configuration;
