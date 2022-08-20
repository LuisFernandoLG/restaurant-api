import mongoose from 'mongoose'

const { Schema, model } = mongoose

const OrderSchema = Schema({
  orderDate: {
    type: Date,
    required: true,
  },
  tableId: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
  },
  takenBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: { type: Schema.Types.ObjectId, ref: 'Status' },
  courseMeals: {
    type: Map,
    of: {
      name: { type: String, required: true },
      clients: {
        type: Map,
        of: {
          name: { type: String },
          dishes: {
            type: Map,
            of: {
              id: { type: Schema.Types.ObjectId, ref: 'Dish' },
              status: { type: Schema.Types.ObjectId, ref: 'Status' },
            },
          },
        },
      },
    },
  },
})

const Order = model('Order', OrderSchema)
export { Order }

// Example of orders JSON
const order1 = {
  tableId: '62fc6bc9d2137bfe151901c0',
  courseMeals: {
    // courseMeal # 1 ----------------------------------------------------------
    0: {
      name: 'Tiempo #1',
      clients: {
        0: {
          // client # 1 ---------------------------
          name: 'Cliente #1',
          dishes: {
            // Dish # 1 --------------
            0: {
              id: '62fd03cdfcce82dfa9067029',
            },
          },
        },

        0: {
          // client # 2 ---------------------------
          name: 'Cliente #2',
          dishes: {
            // Dish # 1 --------------
            0: {
              id: '62fd03cdfcce82dfa9067029',
            },
          },
        },
      },
    },
  },
  // ------------------------------------------------------
  1: {
    name: 'Tiempo #1',
    clients: {
      0: {
        // client # 1 ---------------------------
        name: 'Cliente #1',
        dishes: {
          // Dish # 1 --------------
          0: {
            id: '62fd03cdfcce82dfa9067029',
            id: '62fd03cdfcce82dfa9067029',
            id: '62fd03cdfcce82dfa9067029',
          },
        },
      },

      0: {
        // client # 2 ---------------------------
        name: 'Cliente #2',
        dishes: {
          // Dish # 1 --------------
          0: {
            id: '62fd03cdfcce82dfa9067029',
            id: '62fd03cdfcce82dfa9067029',
          },
        },
      },
    },
  },
  //#---------------------------------------------
  2: {
    name: 'Tiempo #3',
    clients: {
      0: {
        // client # 1 ---------------------------
        name: 'Cliente #1',
        dishes: {
          // Dish # 1 --------------
          0: {
            id: '62fd03cdfcce82dfa9067029',
          },
        },
      },
    },
  },
}
