/**
 *  Fix Brazil phone number, adding the number 9 when it does not exist.
 *
 * @example
 *
 * fixBrazilPhoneNumber('551140028922'); // 5511940028922
 */
export function fixBrazilPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length === 13) {
    return phoneNumber;
  }

  if (phoneNumber.length === 12) {
    const countryCodeAndDDD = phoneNumber.substring(0, 4);
    const phoneNumberRest = phoneNumber.substring(4, 12);

    return `${countryCodeAndDDD}9${phoneNumberRest}`;
  }

  return phoneNumber;
}
