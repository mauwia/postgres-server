FROM node:20.18.0-alpine As development

WORKDIR /user/src/app

COPY . .

RUN yarn


RUN npm run build 


# FROM node:18.16.0-alpine As production

# ARG NODE_ENV=production

# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /user/src/app

# COPY *.json *.*.json .env ./

# RUN yarn --only=production

# COPY apps/api-gateway/ apps/api-gateway/

# COPY libs libs

# COPY --from=development /user/src/app/dist ./dist

# CMD [ "node","dist/apps/api-gateway/main" ]