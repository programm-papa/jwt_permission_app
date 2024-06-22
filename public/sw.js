// глобальная переменная для хранения токена доступа
let accessToken
let permissions

// обработка запросов
self.addEventListener('fetch', async (e) => {
  // объект запроса
  const { request } = e
  // адрес запроса
  const { url } = request

  if (url.includes('mokky')) {
    // Обработка авторизации пользователя
    if (url.includes('auth')) {
      e.respondWith(
        (async () => {
          // Для эмуляции запроса на бек клонируем запрос и обрабатываем запрос по логину (без проверки пароля)
          const requestClone = request.clone()
          const { login } = await requestClone.json()
          // выполняем запрос (запрос выполняем через эмулятор, для работы с мокк сервисом)
          const res = await fetch(request.url.replace('auth', `user_${login}`))
          /* Для реальной версии приложения мы просто прокинем запрос на сервер
          const res = await fetch(request) и будем работать с ответом от данного запроса */
          // если возникла ошибка вернем ошибку на фронт (к примеру валидация логина на беке)
          if (!res.ok) {
            return res
          }

          // клонируем ответ (в связи с тем, что получение информации о теле доступно единожды)
          const data = await res.clone().json()
          // обновляем значение токена
          accessToken = data[0].accessToken

          // Получение прав пользователя
          /* Данный вариант демонстрационный, в рабочем приложении запрос на получение будет содержать права только для одного пользователя, при запросе мы установим токен и на беке декодировав его получим id для отдачи нам прав доступа */
          const permissionReq = await fetch(request.url.replace('auth', `permissions`), {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          // Обработка ошибки ответа запроса за правами
          if (!permissionReq.ok) {
            return permissionReq
          }
          // Демонстрация
          permissions = getPermissions(login, await permissionReq.clone().json())

          // извлекаем дополнительную информацию об ответе
          const { headers, status, statusText } = res.clone()
          // возвращаем ответ без токена и дополнительную информацию
          return new Response(JSON.stringify(data[0].user), {
            headers,
            status,
            statusText
          })
        })()
      )
    }

    if (url.includes('permission')) {
      e.respondWith(
        (async () => {
          const requestClone = request.clone()
          const { permissionName } = await requestClone.json()
          return new Response(JSON.stringify({ permission: permissions[permissionName] }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
            statusText: 'OK'
          })
        })()
      )
    }
  }
})

function getPermissions(login, permissionsObj) {
  return permissionsObj[0][login]
}
