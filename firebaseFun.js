const { FB } = require('./constant')
const fireStore=require('./firebaseConfig')
const FirebaseFun = (nameData, path = '') => {
    const database=fireStore.fireStore.collection(nameData)
    
    const formatData = (data) => {
        const dataTemp = data.data()
        dataTemp.id = data.id
        
        return dataTemp
      }
    return {
        getAllData: async () => {
            const citySnapshot = await database.get()
            return citySnapshot.docs.map((doc) => {
              return formatData(doc)
            })
        },
        getDataByID: async (id) => {
            const citySnapshot = await  database.doc(id).get()
            return {
                id:citySnapshot.id,
                ...citySnapshot.data()
            }              
        },
        getDataByQuery: async (key, match, value) => {
            const citySnapshot = await  database.where(key,match,value).get()
            return citySnapshot.docs.map((doc) => {
                return formatData(doc)
            })             
        },
        
    }
}

const FBCoffee=FirebaseFun(FB.coffee)
const FBUser=FirebaseFun(FB.user)
const FBCart=FirebaseFun(FB.cart)
const FBComment=FirebaseFun(FB.comment)
const FBImgProduct=FirebaseFun(FB.imageProduct)

module.exports={
    FBCoffee,
    FBUser,
    FBCart,
    FBComment,
    FBImgProduct
}