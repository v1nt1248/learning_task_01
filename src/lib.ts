/**
 * функция округления с заданной точностью
 * @param num {number} - округляемое число
 * @param precision {number} - точность округления (количество знаков после запятой
 * указывается со знаком "-")
 * @return {number} - скорректированная округленная десятичная дробь
 */
export function round(num: number, precission: number): number {
  // Сдвиг разрядов
  let tmpNum:any = num.toString().split('e');
  tmpNum = Math.round(+(tmpNum[0] + 'e' + (tmpNum[1] ? (+tmpNum[1] - precission) : -precission)));
  // Обратный сдвиг
  tmpNum = tmpNum.toString().split('e');
  return +(tmpNum[0] + 'e' + (tmpNum[1] ? (+tmpNum[1] -
  + precission) : precission));
};