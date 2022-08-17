import mongoose from 'mongoose'

const { Schema, model } = mongoose

const OrderSchema = Schema({
  orderDate: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  courseMeals: [
    {
      orderId: {
        type: Number,
        required: true,
      },

      name: {
        type: String,
        required: true,
      },
      clients: [
        {
          orderId: {
            type: Number,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          dishes: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
          },
        },
      ],
    },
  ],
  state: {
    type: Schema.Types.ObjectId,
    ref: 'Status',
    required: true,
  },
})

const Order = model('Order', OrderSchema)
export { Order }

// Example of orders JSON

// const order1 = {
//   _id: 'Ood3hih3id2',
//   orderDate:
//     'Tue Aug 16 2022 20:53:14 GMT-0600 (hora de verano del Pacífico de México)',
//   name: 'Mesa 1',
//   courseMeals: [
//     {
//       orderId: 1,
//       name: 'Tiempo #1',
//       clients: [
//         {
//           orderId: 1,
//           name: 'Cliente #1',
//           dishes: [
//             {
//               id: '123456754321',
//               id: '123456754321',
//               id: '9876564324445',
//               id: 'J6756h453t4r2',
//             },
//           ],
//         },
//       ],
//     },
    
//     {
//       orderId: 2,
//       name: 'Tiempo #2',
//       clients: [
//         {
//           orderId: 1,
//           name: 'Cliente #1',
//           dishes: [
//             {
//               id: '123456754321',
//             },
//           ],
//         },
        
//         {
//           orderId: 2,
//           name: 'Cliente #2',
//           dishes: [
//             {
//               id: '000000098765',
//             },
//           ],
//         },

//       ],
//     },
//     {
//       orderId: 3,
//       name: 'Tiempo #3',
//       clients: [
//         {
//           orderId: 1,
//           name: 'Cliente #1',
//           dishes: [
//             {
//               id: '9876543',
//             },
//           ],
//         },
        
//         {
//           orderId: 2,
//           name: 'Cliente #2',
//           dishes: [
//             {
//               id: 'J6756h453t4r2',
//               id: '000000987654',
//             },
//           ],
//         },
//         {
//           orderId: 2,
//           name: 'Cliente #2',
//           dishes: [
//             {
//               id: 'J6756h453t4r2',
//               id: 'J6756h453t4r2',
//             },
//           ],
//         },

//       ],
//     },

//   ],
//   status: '2983nyd2983293',
// }
