// let socket;
// let tryConnect = true;
// let status = 'try';
// export let respons;
// const divStatus = document.querySelector('.js-status');

// function getConnection() {
//   if (tryConnect === true) return new WebSocket('ws://192.168.0.99:9090');
//   return null;
// }

// export function connect() {
//   socket = getConnection();
//   let time;
//   if (socket !== null) {
//     console.log(socket)
//     socket.onopen = (e) => {
//       console.log('Connected');
//       status = 'connected';
//       setInterval(ping, 10000);
//     };
    
//     socket.onmessage = (e) => {
//       console.log('messa')
//       if (e.data.toString() === '__pong__') {
//         status = 'connected';
//         pong();
//         return;
//       }
      
//       const response = JSON.parse(e.data);
//       // getResponse(JSON.parse(e.data));
//       respons =JSON.parse(e.data);
//       // return JSON.parse(e.data);
//       if (response.error) {
//         // close connection
//         socket.close();
//         socket = null;
//         tryConnect = false;
//       }

//       // create list on table
//       // if (response.devices && response.devices.length) {

//       //   // const tBody = document.querySelector('tbody');
//       //   // tBody.innerHTML = '';
//       //   // response.devices.forEach((device) => {
//       //   //   const tr = document.createElement('tr');
//       //   //   tr.setAttribute('id', device.id);
//       //   //   Object.values(device).forEach((element) => {
//       //   //     const td = document.createElement('td');
//       //   //     td.innerText = element;
//       //   //     tr.append(td);
//       //   //   });
//       //   //   tBody.append(tr);
//       //   // });
//       // }

//       // When device connection is closed notify MIEPP controller
//       // if (
//       //   response.message &&
//       //   response.message === 'Device connection is closed'
//       // ) {
//       //   const tBody = document.querySelector('tbody');
//       //   const trs = document.querySelectorAll('tbody tr');
//       //   const idRemove = response.object.id;
//       //   let arrayTr = Array.from(trs);
//       //   arrayTr = arrayTr.filter((tr) => {
//       //     if (+tr.getAttribute('id') !== +idRemove) {
//       //       return tr;
//       //     }
//       //   });
//       //   // insert list
//       //   tBody.innerHTML = '';
//       //   arrayTr.forEach((tr) => {
//       //     tBody.append(tr);
//       //   });
//       // }

//       // console.log(response);
//       // return JSON.parse(e.data);
//     };

//     socket.onerror = (e) => {
//       console.log(e);
//       status = 'error';
//     };

//     socket.onclose = (e) => {
//       setInterval(() => {
//         connect(status);
//       }, 1000);

//       status = 'error';
//     };

//     function ping() {
//       if (status === 'connected') {
//         return;
//       }

//       if (socket !== null) socket.send('__ping__');
//       time = setTimeout(() => {
//         status = 'try';
//       }, 5000);
//     }

//     function pong() {
//       clearTimeout(time);
//     }
//     // return respons;
//   }
// }

// connect();

// function verifyStatus(status) {
//   // console.log(status)
//   // switch (status) {
//   //   case 'connected':
//   //     console.log('green');
//   //     break;
//   //   case 'error':
//   //     console.log( 'red');
//   //     break;
//   //   case 'try':
//   //     console.log( 'yellow');
//   //     break;
//   //   default:
//   // }
// }

// setInterval(() => {
//   if (!navigator.onLine) {
//     status = 'error';
//   }
//   verifyStatus(status);
// }, 5000);

// // function authenticateDevice() {
// //   const btn = document.querySelector('.js-btn-1');
// //   btn.addEventListener('click', (e) => {
// //     socket.send(JSON.stringify({ app_id: 6, imei: '12345' }));
// //   });
// // }

// export function authenticateUser(auth) {
//   // console.log(auth)
//   // console.log(socket)
//   socket!= null&& socket.send(
//       JSON.stringify({ app_id: 5, auth: auth }),
//     );
// }
// //FUNCTION SEE ONLINE DEVICE 
// export function getDevices(auth) {
//   console.log('getDevices')
//     socket.send(
//       JSON.stringify({
//         app_id: 5,
//         auth: auth,
//         type: '1',
//       }),
//     );
// }

// export async function getResponse(response){
//   // console.log(response)
//   return await response
// }
// // getDevices();

// // authenticateUser();

// // authenticateDevice();
