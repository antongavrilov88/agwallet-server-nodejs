
#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "agwallet" <<-EOSQL
    CREATE ROLE agwallet WITH LOGIN PASSWORD 'password';
    CREATE DATABASE "agwalletdb" OWNER = agwallet;
    GRANT ALL PRIVILEGES ON DATABASE "agwalletdb" TO agwallet;
EOSQL