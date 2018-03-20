/**
 * Created by Mark Aquino on 4/20/17.
 */
module.exports = {
    user : process.env.NODE_ORACLEDB_USER || "DEVMA",
    password : process.env.NODE_ORACLEDB_PASSWORD || "DEVMA",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "callisto.bos.us.genedata.com/GDB12",
    externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};