// import gql from "graphql-tag";

// export const typeDefs = gql`
// type Product {
//   id: String,
//   name: String,
//   description: String,
//   price: Int,
//   quantity: Int,
// }
// type ShippingDetails {
//   address: String,
//   userId: Int,
//   contactNumber: String,
//   orderType: String,
//   id: String,
// }
// type Order {
//   id: String,
//   cartItems: [Product],
//   orderTime: String,
//   status: String,
//   price: Int,
//   shippingDetails: ShippingDetails,
// }

// input DeleteOrderInput {
//     id: String,
// }

// type Query {
//     orders: [Order]
// }

// type Mutation {
//     deleteOrder(deleteOrderInput: DeleteOrderInput!):Order
// }
// `

import gql from "graphql-tag";

export const typeDefs = gql`
  type Product {
    id: String
    name: String
    description: String
    price: Int
    quantity: Int
  }

  type ShippingDetails {
    address: String
    userId: Int
    contactNumber: String
    orderType: String
    id: String
  }

  type Order {
    _id:String
    id: String
    cartItems: [Product]
    orderTime: String
    status: String
    price: Int
    shippingDetails: ShippingDetails
  }

  type Query {
    getAllOrders: [Order]
    getOrdersByUserId(userId: String): [Order]
  }

  type Mutation {
    updateOrder(orderId: String, updatedData: OrderInput): Order
    addNewOrder(orderData: OrderInput): Order
    deleteOrder(orderId: String): String
  }

  input OrderInput {
    _id:String
    cartItems: [ProductInput]
    orderTime: String
    status: String
    price: Int
    shippingDetails: ShippingDetailsInput
  }

  input ProductInput {
    id: String
    name: String
    description: String
    price: Int
    quantity: Int
  }

  input ShippingDetailsInput {
    address: String
    userId: Int
    contactNumber: String
    orderType: String
    id: String
  }
`;

export default typeDefs;