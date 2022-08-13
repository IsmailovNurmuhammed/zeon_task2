export class Log {
  counterMessage(counter){
    return counter ? `Найдено ${counter} пользователей ` : 'Ничего не найдено :(';
  }
}