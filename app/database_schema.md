Table Users {
  id INT PK
  username VARCHAR
  email VARCHAR
  hashedPassword VARCHAR
  createdAt DATE
  updatedAt DATE
}


Table Cheatsheet {
  id INT PK
  ownerId INT 
  title VARCHAR
  description VARCHAR
  dependencies TEXT
  mediaURL VARCHAR
  createdAt DATE
  updatedAt DATE
}

Table Steps {
  id INT PK
  cheatsheetId INT
  content TEXT
  mediaURL VARCHAR
  createdAt DATE
  updatedAt DATE
}


Table Comments {
  id INT PK
  writerId INT
  cheatsheetId INT
  content TEXT
  createdAt DATE
  updatedAt DATE
}




Ref: "Cheatsheet"."id" < "Steps"."id"

Ref: "Cheatsheet"."id" < "Comments"."cheatsheetId"

Ref: "Users"."id" < "Comments"."writerId"

Ref: "Cheatsheet"."ownerId" > "Users"."id"