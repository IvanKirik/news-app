import { AbstractControl, UntypedFormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationErrorCode } from './validation-error-code.enum';

export namespace AppValidators {
  /**
   * Checks whether the current control matches another.
   * @param controlName Control name to check matching with.
   * @param controlTitle Control title to display for a user.
   */
  export function matchControl(
    controlName: string,
    controlTitle = controlName,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        control.parent &&
        control.parent.get(controlName)?.value !== control.value
      ) {
        return {
          [ValidationErrorCode.Match]: {
            controlName,
            controlTitle,
          },
        };
      }
      return null;
    };
  }

  /**
   * Create validation error from a message.
   * @param message Message to create an error from.
   */
  export function buildAppError(message: string): ValidationErrors {
    return {
      [ValidationErrorCode.AppError]: {
        message,
      },
    };
  }

  /**
   * Validate that expiry date is correct.
   * @param control Text input control.
   */
  export function isExpiryDateCorrect(
    control: AbstractControl,
  ): ValidationErrors | null {
    if (control instanceof UntypedFormControl) {
      const expiryDate = control.value;

      if (expiryDate !== null) {
        const now = new Date();
        if (now.getTime() > expiryDate.toDate().getTime()) {
          return {
            [ValidationErrorCode.ExpirationDate]: {
              message:
                'Невалидная дата окончания. Дата должна быть больше текущей',
            },
          };
        }

        return null;
      }

      return {
        [ValidationErrorCode.ExpirationDate]: {
          message: 'Дата окончания должна быть в MM/YY формате',
        },
      };
    }
    throw new Error(
      '"isExpiryDateCorrect" validator is supposed to be used with a FormControl instance.',
    );
  }
}

/**
 * Checks whether the date in current control greater than another.
 * @param controlName Control name to compare.
 * @param controlTitle Control title to display for a user.
 */
export function dateGreaterThanControl(
  controlName: string,
  controlTitle: string = controlName,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent || !control.value) {
      return null;
    }

    // @ts-ignore
    const anotherValue: DateTime = control.parent.controls[controlName].value;

    // DateTime.
    const { value } = control;
    const error = {
      [ValidationErrorCode.Greater]: {
        controlName,
        controlTitle,
      },
    };

    if (value && !anotherValue) {
      return error;
    }

    if (value.toDate().getTime() < anotherValue.toDate().getTime()) {
      return error;
    }

    return null;
  };
}
