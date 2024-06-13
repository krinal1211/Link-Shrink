// kuchh nai basicaly ye "sessionIdToUserMap" hamari dayari he jisme id and info validate...parking vala exampla 
// yaha pe ak problem ayega ki jab bhi hum server ko restart karenge , map khali hojayega , hame vapis se new vala login karna pagega
const sessionIdToUserMap= new Map();

function setUser(id,user){
    sessionIdToUserMap.set(id,user);
}
function getUser(id,user){
    return sessionIdToUserMap.get(id);
}
module.exports={
    setUser,
    getUser,
};