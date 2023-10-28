const { FB } = require("./constant");
const fireStore = require("./firebaseConfig");
const FirebaseFun = (nameData, path = "") => {
  const database = fireStore.fireStore.collection(nameData);

  const formatData = (data) => {
    const dataTemp = data.data();
    dataTemp.id = data.id;

    return dataTemp;
  };
  return {
    getAllData: async () => {
      const citySnapshot = await database.get();
      return citySnapshot.docs.map((doc) => {
        return formatData(doc);
      });
    },
    getDataByID: async (id) => {
      const citySnapshot = await database.doc(id).get();
      return {
        id: citySnapshot.id,
        ...citySnapshot.data(),
      };
    },
    getDataByQuery: async (key, match, value) => {
      const citySnapshot = await database.where(key, match, value).get();
      return citySnapshot.docs.map((doc) => {
        return formatData(doc);
      });
    },
    getDataByListQuery: async (listQuery = []) => {
        console.log({listQuery});
    let citySnapshot=null
      switch (listQuery.length) {
        case 0:
             citySnapshot = await database
              .get();
            return citySnapshot.docs.map((doc) => {
              return formatData(doc);
            });
        case 1:
           citySnapshot = await database
            .where(listQuery[0].key, listQuery[0].match, listQuery[0].value)
            .get();
          return citySnapshot.docs.map((doc) => {
            return formatData(doc);
          });
        case 2:
           citySnapshot = await database
            .where(listQuery[0].key, listQuery[0].match, listQuery[0].value)
            .where(listQuery[1].key, listQuery[1].match, listQuery[1].value)
            .get();
          return citySnapshot.docs.map((doc) => {
            return formatData(doc);
          });
        case 3:
           citySnapshot = await database
            .where(listQuery[0].key, listQuery[0].match, listQuery[0].value)
            .where(listQuery[1].key, listQuery[1].match, listQuery[1].value)
            .where(listQuery[2].key, listQuery[2].match, listQuery[2].value)
            .get();
          return citySnapshot.docs.map((doc) => {
            return formatData(doc);
          });
        case 4:
           citySnapshot = await database
            .where(listQuery[0].key, listQuery[0].match, listQuery[0].value)
            .where(listQuery[1].key, listQuery[1].match, listQuery[1].value)
            .where(listQuery[2].key, listQuery[2].match, listQuery[2].value)
            .where(listQuery[3].key, listQuery[3].match, listQuery[3].value)
            .get();
          return citySnapshot.docs.map((doc) => {
            return formatData(doc);
          });
        case 5:
           citySnapshot = await database
            .where(listQuery[0].key, listQuery[0].match, listQuery[0].value)
            .where(listQuery[1].key, listQuery[1].match, listQuery[1].value)
            .where(listQuery[2].key, listQuery[2].match, listQuery[2].value)
            .where(listQuery[3].key, listQuery[3].match, listQuery[3].value)
            .where(listQuery[4].key, listQuery[4].match, listQuery[4].value)
            .get();
          return citySnapshot.docs.map((doc) => {
            return formatData(doc);
          });
        case 6:
           citySnapshot = await database
            .where(listQuery[0].key, listQuery[0].match, listQuery[0].value)
            .where(listQuery[1].key, listQuery[1].match, listQuery[1].value)
            .where(listQuery[2].key, listQuery[2].match, listQuery[2].value)
            .where(listQuery[3].key, listQuery[3].match, listQuery[3].value)
            .where(listQuery[4].key, listQuery[4].match, listQuery[4].value)
            .where(listQuery[5].key, listQuery[5].match, listQuery[5].value)
            .get();
          return citySnapshot.docs.map((doc) => {
            return formatData(doc);
          });
      }
    },
  };
};

const FBCoffee = FirebaseFun(FB.coffee);
const FBUser = FirebaseFun(FB.user);
const FBCart = FirebaseFun(FB.cart);
const FBComment = FirebaseFun(FB.comment);
const FBImgProduct = FirebaseFun(FB.imageProduct);
const FBTypeProduct = FirebaseFun(FB.typeProduct);
const FBProductShop = FirebaseFun(FB.productShop);

module.exports = {
  FBCoffee,
  FBUser,
  FBCart,
  FBComment,
  FBImgProduct,
  FBTypeProduct,
  FBProductShop,
};
