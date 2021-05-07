
#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "sampleUser" <<-EOSQL
    CREATE ROLE sampleUser WITH LOGIN PASSWORD 'password';
    CREATE DATABASE "sampledb" OWNER = sampleUser;
    GRANT ALL PRIVILEGES ON DATABASE "sampledb" TO sampleUser;
EOSQL