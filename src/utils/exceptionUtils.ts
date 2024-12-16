const ValidationException = (message: string): Error => {
  return new Error(message);
};

export class ValidationUtils {
  static isEmpty(value: string | null | undefined): boolean {
    return value === '' || value === null || value === undefined;
  }

  static isNullOrWhiteSpace(value: string | null | undefined): boolean {
    return value === null || value === undefined || value === '';
  }

  static idControl(value: string | null): void {
    if (value === null || value === undefined) {
      throw ValidationException('Id is required');
    }
  }
}

export function ServiceErrorHandler(
  _: any,
  __: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error: any) {
      return Promise.reject({
        status: 400,
        data: error.message,
      });
    }
  };

  return descriptor;
}

export default ValidationException;
