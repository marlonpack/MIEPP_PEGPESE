import React from "react";
import { NotificationStore } from "./StoreNotification";


const NotificationError = (error) => {
  console.log(error)
  if (!error) return null;
  if (error == null) return null;
  // if (error != null) NotificationStore('erro', error, 'danger')
 
  //Authorization
  if (error.includes("Authorization denied"))
  NotificationStore('Erro', 'Autorização negada', 'danger')

  //Login
  if (error.includes("(user, password, app_id) is broken"))
    NotificationStore('Erro', '(user, password, app_id) esta quebrado', 'danger')
  else if (error.includes("Default password is not permited"))
    NotificationStore('Erro', 'Senha padrão não é permitida', 'danger')
  else if (error.includes("This password do is not match"))
    NotificationStore('Erro', 'A senha não esta correta', 'danger')
  else if (error.includes("This user does not have access to this application"))
    NotificationStore('Erro', 'O usuário não tem acesso a essa aplicação', 'danger')
  else if (error.includes("This user is blocked"))
    NotificationStore('Erro', 'O usuário esta bloqueado', 'danger')
  else if (error.includes("User or password error"))
    NotificationStore('Erro', 'Usuário ou senha esta incorreto', 'danger')
  else if (error.includes("Password require minimum 8 digits"))
    NotificationStore('Erro', 'A senha requer no minimo 8 dígitos', 'danger')
  else if (error.includes("Both is the same password"))
    NotificationStore('Erro', 'Ambos são a mesma senha', 'danger')
  else if (error.includes("This method is not allowed"))
    NotificationStore('Erro', 'Usuário ou senha esta incorreto', 'danger')
  else if (error.includes("No data"))
    NotificationStore('Erro', 'Nada encontrado', 'danger')

  //Media
  else if (error.includes("(description, file, type, supplier_id) is broken"))
    NotificationStore('Erro', '(description, file, type, supplier_id) esta quebrado', 'danger')
  else if (error.includes("(id, description, file, type, supplier_id) is broken"))
    NotificationStore('Erro', '(id, description, file, type, supplier_id) esta quebrado', 'danger')
  else if (error.includes("This media is in use and can not be modified"))
    NotificationStore('Erro', 'Essa mídia esta em uso e não pode ser modificada ', 'danger')
  else if (error.includes("(id) is broken"))
    NotificationStore('Erro', '(id) esta quebrado', 'danger')
  else if (error.includes("Type 0, 1 and 2 is only to internal"))
    NotificationStore('Erro', 'Tipo 0, 1 and 2 são apenas para mídia interna', 'danger')
  else if (error.includes("Type 3 and 4 is only to external"))
    NotificationStore('Erro', 'Tipo 3 and 4 são apenas para mídia externa', 'danger')

  //ProductScreen
  else if (error.includes("(screen_id) is broken"))
    NotificationStore('Erro', '(screen_id) esta quebrado', 'danger')
  else if (error.includes("(screen_id, product_id) is broken"))
    NotificationStore('Erro', '(screen_id, product_id) esta quebrado', 'danger')
  else if (error.includes("The media type on this screen does not allow a products list"))
    NotificationStore('Erro', 'O tipo de mídia nesta tela não permite uma lista de produtos', 'danger')

  //Screen
  else if (error.includes("(description, time, media_id, department_id) is broken"))
    NotificationStore('Erro', '(description, time, media_id, department_id)  esta quebrado', 'danger')
  else if (error.includes("(id, description, time, media_id, department_id) is broken"))
    NotificationStore('Erro', '(id, description, time, media_id, department_id) esta quebrado', 'danger')
  else if (error.includes("Type 0 that corresponds to product list can not be configurated without department"))
    NotificationStore('Erro', 'O tipo 0 que corresponde à lista de produtos não pode ser configurado sem departamento', 'danger')
  else if (error.includes("Department can only be configurated if the product list is type 0"))
    NotificationStore('Erro', 'Departamento só pode ser configurado se a lista de produtos for do tipo 0', 'danger')

  //Supplier
  else if (error.includes("(description) is broken"))
    NotificationStore('Erro', '(description)  esta quebrado', 'danger')
  else if (error.includes("(id, description) is broken"))
    NotificationStore('Erro', '(id, description) esta quebrado', 'danger')
  else if (error.includes("ID 1 of internal can not be modified"))
    NotificationStore('Erro', '(description, time, media_id, department_id)  esta quebrado', 'danger')
  else if (error.includes("ID 1 of internal can not be deleted"))
    NotificationStore('Erro', '(description, time, media_id, department_id)  esta quebrado', 'danger')

  //Timeline
  else if (error.includes("(description, initial_hour, final_hour, initial_date, final_date) is broken"))
    NotificationStore('Erro', '(description, initial_hour, final_hour, initial_date, final_date)  esta quebrado', 'danger')
  else if (error.includes("(id, description, initial_hour, final_hour, initial_date, final_date) is broken"))
    NotificationStore('Erro', '(id, description, initial_hour, final_hour, initial_date, final_date) esta quebrado', 'danger')
  else if (error.includes("Incorrect format for initial hour. The correct format is (00:00:00)"))
    NotificationStore('Erro', 'Formato incorreto para a hora inicial. O formato correto é (00:00:00)', 'danger')
  else if (error.includes("Incorrect value for final hour. The correct format is (00:00:00)"))
    NotificationStore('Erro', 'Valor incorreto para hora final. O formato correto é (00:00:00)', 'danger')
  else if (error.includes("Initial hour could not be major or equals the final hour"))
    NotificationStore('Erro', 'A hora inicial não pode ser maior ou igual à hora final', 'danger')
  else if (error.includes("Incorrect format for initial date. The correct format is (1990-01-01)"))
    NotificationStore('Erro', 'Formato incorreto para data inicial. O formato correto é (1990-01-01)', 'danger')
  else if (error.includes("Incorrect value for final date. The correct format is (1990-01-01)"))
    NotificationStore('Erro', 'Valor incorreto para data final. O formato correto é (1990-01-01)', 'danger')
  else if (error.includes("Initial date could not be major the final date"))
    NotificationStore('Erro', 'A data inicial não poderia ser maior que a data final', 'danger')

  //TimeScreen
  else if (error.includes("(timeline_id) is broken"))
    NotificationStore('Erro', '(timeline_id)  esta quebrado', 'danger')
  else if (error.includes("(timeline_id, screen_id, initial_time) is broken"))
    NotificationStore('Erro', '(timeline_id, screen_id, initial_time)  esta quebrado', 'danger')
  else if (error.includes("(timeline_id, screen_id) is broken"))
    NotificationStore('Erro', '(timeline_id, screen_id)  esta quebrado', 'danger')

  //TimelineShop
  else if (error.includes("(timeline_id, shop_id) is broken"))
    NotificationStore('Erro', '(timeline_id, shop_id) esta quebrado', 'danger')

  else if (NotificationStore('erro', error, 'danger'))
    return null

};

export default NotificationError;