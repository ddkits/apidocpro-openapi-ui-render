var yamlExample = "openapi: 3.0.3\ninfo:\n  title: Apidocpro Petstore - OpenAPI 3.0\n  description: |-\n    This is a sample Pet Store Server based on the OpenAPI 3.0.3 specification.  You can find out more about\n  termsOfService: https://apidocpro.com/terms\n  contact:\n    email: apiteam@apidocpro.com\n  license:\n    name: Apache 2.0\n    url: http://www.apache.org/licenses/LICENSE-2.0.html\n  version: 1.0.11\nexternalDocs:\n  description: Find out more about Apidocpro\n  url: http://apidocpro.com\nservers:\n  - url: https://apidocpro.com/editor\ntags:\n  - name: pet for testing long names\n    description: Everything about your Pets\n    externalDocs:\n      description: Find out more\n      url: http://apidocpro.com\n  - name: store\n    description: Access to Petstore orders\n    externalDocs:\n      description: Find out more about our store\n      url: http://apidocpro.com\n  - name: user\n    description: Operations about user\npaths:\n  /pet:\n    put:\n      tags:\n        - pet for testing long names\n      summary: Update an existing pet\n      description: Update an existing pet by Id\n      operationId: updatePet\n      requestBody:\n        description: Update an existent pet in the store\n        content:\n          application/json:\n            schema:\n              $ref: '#/components/schemas/Pet'\n          application/xml:\n            schema:\n              $ref: '#/components/schemas/Pet'\n          application/x-www-form-urlencoded:\n            schema:\n              $ref: '#/components/schemas/Pet'\n        required: true\n      responses:\n        '200':\n          description: Successful operation\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Pet'          \n            application/xml:\n              schema:\n                $ref: '#/components/schemas/Pet'\n        '400':\n          description: Invalid ID supplied\n        '404':\n          description: Pet not found\n        '405':\n          description: Validation exception\n      security:\n        - petstore_auth:\n            - write:pets\n            - read:pets\n    post:\n      tags:\n        - pet for testing long names\n      summary: Add a new pet to the store\n      description: Add a new pet to the store\n      operationId: addPet\n      requestBody:\n        description: Create a new pet in the store\n        content:\n          application/json:\n            schema:\n              $ref: '#/components/schemas/Pet'\n          application/xml:\n            schema:\n              $ref: '#/components/schemas/Pet'\n          application/x-www-form-urlencoded:\n            schema:\n              $ref: '#/components/schemas/Pet'\n        required: true\n      responses:\n        '200':\n          description: Successful operation\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Pet'          \n            application/xml:\n              schema:\n                $ref: '#/components/schemas/Pet'\n        '405':\n          description: Invalid input\n      security:\n        - petstore_auth:\n            - write:pets\n            - read:pets\n  /pet/findByStatus:\n    get:\n      tags:\n        - pet for testing long names\n      summary: Finds Pets by status\n      description: Multiple status values can be provided with comma separated strings\n      operationId: findPetsByStatus\n      parameters:\n        - name: status\n          in: query\n          description: Status values that need to be considered for filter\n          required: false\n          explode: true\n          schema:\n            type: string\n            default: available\n            enum:\n              - available\n              - pending\n              - sold\n      responses:\n        '200':\n          description: successful operation\n          content:\n            application/json:\n              schema:\n                type: array\n                items:\n                  $ref: '#/components/schemas/Pet'          \n            application/xml:\n              schema:\n                type: array\n                items:\n                  $ref: '#/components/schemas/Pet'\n        '400':\n          description: Invalid status value\n      security:\n        - petstore_auth:\n            - write:pets\n            - read:pets\n  /pet/findByTags:\n    get:\n      tags:\n        - pet\n      summary: Finds Pets by tags\n      description: Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.\n      operationId: findPetsByTags\n      parameters:\n        - name: tags\n          in: query\n          description: Tags to filter by\n          required: false\n          explode: true\n          schema:\n            type: array\n            items:\n              type: string\n      responses:\n        '200':\n          description: successful operation\n          content:\n            application/json:\n              schema:\n                type: array\n                items:\n                  $ref: '#/components/schemas/Pet'          \n            application/xml:\n              schema:\n                type: array\n                items:\n                  $ref: '#/components/schemas/Pet'\n        '400':\n          description: Invalid tag value\n      security:\n        - petstore_auth:\n            - write:pets\n            - read:pets\n  /pet/{petId}:\n    get:\n      tags:\n        - pet\n      summary: Find pet by ID\n      description: Returns a single pet\n      operationId: getPetById\n      parameters:\n        - name: petId\n          in: path\n          description: ID of pet to return\n          required: true\n          schema:\n            type: integer\n            format: int64\n      responses:\n        '200':\n          description: successful operation\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Pet'          \n            application/xml:\n              schema:\n                $ref: '#/components/schemas/Pet'\n        '400':\n          description: Invalid ID supplied\n        '404':\n          description: Pet not found\n      security:\n        - api_key: []\n        - petstore_auth:\n            - write:pets\n            - read:pets\n    post:\n      tags:\n        - pet\n      summary: Updates a pet in the store with form data\n      description: ''\n      operationId: updatePetWithForm\n      parameters:\n        - name: petId\n          in: path\n          description: ID of pet that needs to be updated\n          required: true\n          schema:\n            type: integer\n            format: int64\n        - name: name\n          in: query\n          description: Name of pet that needs to be updated\n          schema:\n            type: string\n        - name: status\n          in: query\n          description: Status of pet that needs to be updated\n          schema:\n            type: string\n      responses:\n        '405':\n          description: Invalid input\n      security:\n        - petstore_auth:\n            - write:pets\n            - read:pets\n    delete:\n      tags:\n        - pet\n      summary: Deletes a pet\n      description: delete a pet\n      operationId: deletePet\n      parameters:\n        - name: api_key\n          in: header\n          description: ''\n          required: false\n          schema:\n            type: string\n        - name: petId\n          in: path\n          description: Pet id to delete\n          required: true\n          schema:\n            type: integer\n            format: int64\n      responses:\n        '400':\n          description: Invalid pet value\n      security:\n        - petstore_auth:\n            - write:pets\n            - read:pets\n  /pet/{petId}/uploadImage:\n    post:\n      tags:\n        - pet\n      summary: uploads an image\n      description: ''\n      operationId: uploadFile\n      parameters:\n        - name: petId\n          in: path\n          description: ID of pet to update\n          required: true\n          schema:\n            type: integer\n            format: int64\n        - name: additionalMetadata\n          in: query\n          description: Additional Metadata\n          required: false\n          schema:\n            type: string\n      requestBody:\n        content:\n          application/octet-stream:\n            schema:\n              type: string\n              format: binary\n      responses:\n        '200':\n          description: successful operation\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/ApiResponse'\n      security:\n        - petstore_auth:\n            - write:pets\n            - read:pets\n  /store/inventory:\n    get:\n      tags:\n        - store\n      summary: Returns pet inventories by status\n      description: Returns a map of status codes to quantities\n      operationId: getInventory\n      responses:\n        '200':\n          description: successful operation\n          content:\n            application/json:\n              schema:\n                type: object\n                additionalProperties:\n                  type: integer\n                  format: int32\n      security:\n        - api_key: []\n  /store/order:\n    post:\n      tags:\n        - store\n      summary: Place an order for a pet\n      description: Place a new order in the store\n      operationId: placeOrder\n      requestBody:\n        content:\n          application/json:\n            schema:\n              $ref: '#/components/schemas/Order'\n          application/xml:\n            schema:\n              $ref: '#/components/schemas/Order'\n          application/x-www-form-urlencoded:\n            schema:\n              $ref: '#/components/schemas/Order'\n      responses:\n        '200':\n          description: successful operation\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Order'\n        '405':\n          description: Invalid input\n  /store/order/{orderId}:\n    get:\n      tags:\n        - store\n      summary: Find purchase order by ID\n      description: For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.\n      operationId: getOrderById\n      parameters:\n        - name: orderId\n          in: path\n          description: ID of order that needs to be fetched\n          required: true\n          schema:\n            type: integer\n            format: int64\n      responses:\n        '200':\n          description: successful operation\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Order'          \n            application/xml:\n              schema:\n                $ref: '#/components/schemas/Order'\n        '400':\n          description: Invalid ID supplied\n        '404':\n          description: Order not found\n    delete:\n      tags:\n        - store\n      summary: Delete purchase order by ID\n      description: For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors\n      operationId: deleteOrder\n      parameters:\n        - name: orderId\n          in: path\n          description: ID of the order that needs to be deleted\n          required: true\n          schema:\n            type: integer\n            format: int64\n      responses:\n        '400':\n          description: Invalid ID supplied\n        '404':\n          description: Order not found\n  /user:\n    post:\n      tags:\n        - user\n      summary: Create user\n      description: This can only be done by the logged in user.\n      operationId: createUser\n      requestBody:\n        description: Created user object\n        content:\n          application/json:\n            schema:\n              $ref: '#/components/schemas/User'\n          application/xml:\n            schema:\n              $ref: '#/components/schemas/User'\n          application/x-www-form-urlencoded:\n            schema:\n              $ref: '#/components/schemas/User'\n      responses:\n        default:\n          description: successful operation\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/User'\n            application/xml:\n              schema:\n                $ref: '#/components/schemas/User'\n  /user/createWithList:\n    post:\n      tags:\n        - user\n      summary: Creates list of users with given input array\n      description: Creates list of users with given input array\n      operationId: createUsersWithListInput\n      requestBody:\n        content:\n          application/json:\n            schema:\n              type: array\n              items:\n                $ref: '#/components/schemas/User'\n      responses:\n        '200':\n          description: Successful operation\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/User'          \n            application/xml:\n              schema:\n                $ref: '#/components/schemas/User'\n        default:\n          description: successful operation\n  /user/login:\n    get:\n      tags:\n        - user\n      summary: Logs user into the system\n      description: ''\n      operationId: loginUser\n      parameters:\n        - name: username\n          in: query\n          description: The user name for login\n          required: false\n          schema:\n            type: string\n        - name: password\n          in: query\n          description: The password for login in clear text\n          required: false\n          schema:\n            type: string\n      responses:\n        '200':\n          description: successful operation\n          headers:\n            X-Rate-Limit:\n              description: calls per hour allowed by the user\n              schema:\n                type: integer\n                format: int32\n            X-Expires-After:\n              description: date in UTC when token expires\n              schema:\n                type: string\n                format: date-time\n          content:\n            application/xml:\n              schema:\n                type: string\n            application/json:\n              schema:\n                type: string\n        '400':\n          description: Invalid username/password supplied\n  /user/logout:\n    get:\n      tags:\n        - user\n      summary: Logs out current logged in user session\n      description: ''\n      operationId: logoutUser\n      parameters: []\n      responses:\n        default:\n          description: successful operation\n  /user/{username}:\n    get:\n      tags:\n        - user\n      summary: Get user by user name\n      description: ''\n      operationId: getUserByName\n      parameters:\n        - name: username\n          in: path\n          description: 'The name that needs to be fetched. Use user1 for testing. '\n          required: true\n          schema:\n            type: string\n      responses:\n        '200':\n          description: successful operation\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/User'          \n            application/xml:\n              schema:\n                $ref: '#/components/schemas/User'\n        '400':\n          description: Invalid username supplied\n        '404':\n          description: User not found\n    put:\n      tags:\n        - user\n      summary: Update user\n      description: This can only be done by the logged in user.\n      operationId: updateUser\n      parameters:\n        - name: username\n          in: path\n          description: name that need to be deleted\n          required: true\n          schema:\n            type: string\n      requestBody:\n        description: Update an existent user in the store\n        content:\n          application/json:\n            schema:\n              $ref: '#/components/schemas/User'\n          application/xml:\n            schema:\n              $ref: '#/components/schemas/User'\n          application/x-www-form-urlencoded:\n            schema:\n              $ref: '#/components/schemas/User'\n      responses:\n        default:\n          description: successful operation\n    delete:\n      tags:\n        - user\n      summary: Delete user\n      description: This can only be done by the logged in user.\n      operationId: deleteUser\n      parameters:\n        - name: username\n          in: path\n          description: The name that needs to be deleted\n          required: true\n          schema:\n            type: string\n      responses:\n        '400':\n          description: Invalid username supplied\n        '404':\n          description: User not found\ncomponents:\n  schemas:\n    Order:\n      type: object\n      properties:\n        id:\n          type: integer\n          format: int64\n          example: 10\n        petId:\n          type: integer\n          format: int64\n          example: 198772\n        quantity:\n          type: integer\n          format: int32\n          example: 7\n        shipDate:\n          type: string\n          format: date-time\n        status:\n          type: string\n          description: Order Status\n          example: approved\n          enum:\n            - placed\n            - approved\n            - delivered\n        complete:\n          type: boolean\n      xml:\n        name: order\n    Customer:\n      type: object\n      properties:\n        id:\n          type: integer\n          format: int64\n          example: 100000\n        username:\n          type: string\n          example: fehguy\n        address:\n          type: array\n          xml:\n            name: addresses\n            wrapped: true\n          items:\n            $ref: '#/components/schemas/Address'\n      xml:\n        name: customer\n    Address:\n      type: object\n      properties:\n        street:\n          type: string\n          example: 437 Lytton\n        city:\n          type: string\n          example: Palo Alto\n        state:\n          type: string\n          example: CA\n        zip:\n          type: string\n          example: '94301'\n      xml:\n        name: address\n    Category:\n      type: object\n      properties:\n        id:\n          type: integer\n          format: int64\n          example: 1\n        name:\n          type: string\n          example: Dogs\n      xml:\n        name: category\n    User:\n      type: object\n      properties:\n        id:\n          type: integer\n          format: int64\n          example: 10\n        username:\n          type: string\n          example: theUser\n        firstName:\n          type: string\n          example: John\n        lastName:\n          type: string\n          example: James\n        email:\n          type: string\n          example: john@email.com\n        password:\n          type: string\n          example: '12345'\n        phone:\n          type: string\n          example: '12345'\n        userStatus:\n          type: integer\n          description: User Status\n          format: int32\n          example: 1\n      xml:\n        name: user\n    Tag:\n      type: object\n      properties:\n        id:\n          type: integer\n          format: int64\n        name:\n          type: string\n      xml:\n        name: tag\n    Pet:\n      required:\n        - name\n        - photoUrls\n      type: object\n      properties:\n        id:\n          type: integer\n          format: int64\n          example: 10\n        name:\n          type: string\n          example: doggie\n        category:\n          $ref: '#/components/schemas/Category'\n        photoUrls:\n          type: array\n          xml:\n            wrapped: true\n          items:\n            type: string\n            xml:\n              name: photoUrl\n        tags:\n          type: array\n          xml:\n            wrapped: true\n          items:\n            $ref: '#/components/schemas/Tag'\n        status:\n          type: string\n          description: pet status in the store\n          enum:\n            - available\n            - pending\n            - sold\n      xml:\n        name: pet\n    ApiResponse:\n      type: object\n      properties:\n        code:\n          type: integer\n          format: int32\n        type:\n          type: string\n        message:\n          type: string\n      xml:\n        name: '##default'\n  requestBodies:\n    Pet:\n      description: Pet object that needs to be added to the store\n      content:\n        application/json:\n          schema:\n            $ref: '#/components/schemas/Pet'\n        application/xml:\n          schema:\n            $ref: '#/components/schemas/Pet'\n    UserArray:\n      description: List of user object\n      content:\n        application/json:\n          schema:\n            type: array\n            items:\n              $ref: '#/components/schemas/User'\n  securitySchemes:\n    petstore_auth:\n      type: oauth2\n      flows:\n        implicit:\n          authorizationUrl: https://apidocpro.com/login\n          scopes:\n            write:pets: modify pets in your account\n            read:pets: read your pets\n    api_key:\n      type: apiKey\n      name: api_key\n      in: header";
var jsonExample = {
  openapi: '3.1.0',
  info: {
    title: 'Apidocpro Petstore',
    description: 'This is a sample Pet Store Server based on the OpenAPI 3.0 specification.',
    termsOfService: 'http://apidocpro.com/terms',
    contact: {
      email: 'apiteam@apidocpro.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    },
    version: '1.0.11'
  },
  externalDocs: {
    description: 'Find out more about Apidocpro',
    url: 'http://apidocpro.com'
  },
  servers: [{
    url: 'https://petstore3.apidocpro.com/editor'
  }],
  tags: [{
    name: 'pet',
    description: 'Everything about your Pets',
    externalDocs: {
      description: 'Find out more',
      url: 'http://apidocpro.com'
    }
  }, {
    name: 'store',
    description: 'Access to Petstore orders',
    externalDocs: {
      description: 'Find out more about our store',
      url: 'http://apidocpro.com'
    }
  }, {
    name: 'user',
    description: 'Operations about user'
  }],
  paths: {
    '/pet': {
      put: {
        tags: ['pet'],
        summary: 'Update an existing pet',
        description: 'Update an existing pet by Id',
        operationId: 'updatePet',
        requestBody: {
          description: 'Update an existent pet in the store',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              }
            }
          },
          400: {
            description: 'Invalid ID supplied'
          },
          404: {
            description: 'Pet not found'
          },
          405: {
            description: 'Validation exception'
          }
        },
        security: [{
          petstore_auth: ['write:pets', 'read:pets']
        }]
      },
      post: {
        tags: ['pet'],
        summary: 'Add a new pet to the store',
        description: 'Add a new pet to the store',
        operationId: 'addPet',
        requestBody: {
          description: 'Create a new pet in the store',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              }
            }
          },
          405: {
            description: 'Invalid input'
          }
        },
        security: [{
          petstore_auth: ['write:pets', 'read:pets']
        }]
      }
    },
    '/pet/findByStatus': {
      get: {
        tags: ['pet'],
        summary: 'Finds Pets by status',
        description: 'Multiple status values can be provided with comma separated strings',
        operationId: 'findPetsByStatus',
        parameters: [{
          name: 'status',
          in: 'query',
          description: 'Status values that need to be considered for filter',
          required: false,
          explode: true,
          schema: {
            type: 'string',
            default: 'available',
            enum: ['available', 'pending', 'sold']
          }
        }],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Pet'
                  }
                }
              },
              'application/xml': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Pet'
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid status value'
          }
        },
        security: [{
          petstore_auth: ['write:pets', 'read:pets']
        }]
      }
    },
    '/pet/findByTags': {
      get: {
        tags: ['pet'],
        summary: 'Finds Pets by tags',
        description: 'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
        operationId: 'findPetsByTags',
        parameters: [{
          name: 'tags',
          in: 'query',
          description: 'Tags to filter by',
          required: false,
          explode: true,
          schema: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Pet'
                  }
                }
              },
              'application/xml': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Pet'
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid tag value'
          }
        },
        security: [{
          petstore_auth: ['write:pets', 'read:pets']
        }]
      }
    },
    '/pet/{petId}': {
      get: {
        tags: ['pet'],
        summary: 'Find pet by ID',
        description: 'Returns a single pet',
        operationId: 'getPetById',
        parameters: [{
          name: 'petId',
          in: 'path',
          description: 'ID of pet to return',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64'
          }
        }],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              }
            }
          },
          400: {
            description: 'Invalid ID supplied'
          },
          404: {
            description: 'Pet not found'
          }
        },
        security: [{
          api_key: []
        }, {
          petstore_auth: ['write:pets', 'read:pets']
        }]
      },
      post: {
        tags: ['pet'],
        summary: 'Updates a pet in the store with form data',
        description: '',
        operationId: 'updatePetWithForm',
        parameters: [{
          name: 'petId',
          in: 'path',
          description: 'ID of pet that needs to be updated',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64'
          }
        }, {
          name: 'name',
          in: 'query',
          description: 'Name of pet that needs to be updated',
          schema: {
            type: 'string'
          }
        }, {
          name: 'status',
          in: 'query',
          description: 'Status of pet that needs to be updated',
          schema: {
            type: 'string'
          }
        }],
        responses: {
          405: {
            description: 'Invalid input'
          }
        },
        security: [{
          petstore_auth: ['write:pets', 'read:pets']
        }]
      },
      delete: {
        tags: ['pet'],
        summary: 'Deletes a pet',
        description: 'delete a pet',
        operationId: 'deletePet',
        parameters: [{
          name: 'api_key',
          in: 'header',
          description: '',
          required: false,
          schema: {
            type: 'string'
          }
        }, {
          name: 'petId',
          in: 'path',
          description: 'Pet id to delete',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64'
          }
        }],
        responses: {
          400: {
            description: 'Invalid pet value'
          }
        },
        security: [{
          petstore_auth: ['write:pets', 'read:pets']
        }]
      }
    },
    '/pet/{petId}/uploadImage': {
      post: {
        tags: ['pet'],
        summary: 'uploads an image',
        description: '',
        operationId: 'uploadFile',
        parameters: [{
          name: 'petId',
          in: 'path',
          description: 'ID of pet to update',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64'
          }
        }, {
          name: 'additionalMetadata',
          in: 'query',
          description: 'Additional Metadata',
          required: false,
          schema: {
            type: 'string'
          }
        }],
        requestBody: {
          content: {
            'application/octet-stream': {
              schema: {
                type: 'string',
                format: 'binary'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            }
          }
        },
        security: [{
          petstore_auth: ['write:pets', 'read:pets']
        }]
      }
    },
    '/store/inventory': {
      get: {
        tags: ['store'],
        summary: 'Returns pet inventories by status',
        description: 'Returns a map of status codes to quantities',
        operationId: 'getInventory',
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  additionalProperties: {
                    type: 'integer',
                    format: 'int32'
                  }
                }
              }
            }
          }
        },
        security: [{
          api_key: []
        }]
      }
    },
    '/store/order': {
      post: {
        tags: ['store'],
        summary: 'Place an order for a pet',
        description: 'Place a new order in the store',
        operationId: 'placeOrder',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Order'
              }
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/Order'
              }
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/Order'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              }
            }
          },
          405: {
            description: 'Invalid input'
          }
        }
      }
    },
    '/store/order/{orderId}': {
      get: {
        tags: ['store'],
        summary: 'Find purchase order by ID',
        description: 'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',
        operationId: 'getOrderById',
        parameters: [{
          name: 'orderId',
          in: 'path',
          description: 'ID of order that needs to be fetched',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64'
          }
        }],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              }
            }
          },
          400: {
            description: 'Invalid ID supplied'
          },
          404: {
            description: 'Order not found'
          }
        }
      },
      delete: {
        tags: ['store'],
        summary: 'Delete purchase order by ID',
        description: 'For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors',
        operationId: 'deleteOrder',
        parameters: [{
          name: 'orderId',
          in: 'path',
          description: 'ID of the order that needs to be deleted',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64'
          }
        }],
        responses: {
          400: {
            description: 'Invalid ID supplied'
          },
          404: {
            description: 'Order not found'
          }
        }
      }
    },
    '/user': {
      post: {
        tags: ['user'],
        summary: 'Create user',
        description: 'This can only be done by the logged in user.',
        operationId: 'createUser',
        requestBody: {
          description: 'Created user object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        responses: {
          default: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          }
        }
      }
    },
    '/user/createWithList': {
      post: {
        tags: ['user'],
        summary: 'Creates list of users with given input array',
        description: 'Creates list of users with given input array',
        operationId: 'createUsersWithListInput',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          default: {
            description: 'successful operation'
          }
        }
      }
    },
    '/user/login': {
      get: {
        tags: ['user'],
        summary: 'Logs user into the system',
        description: '',
        operationId: 'loginUser',
        parameters: [{
          name: 'username',
          in: 'query',
          description: 'The user name for login',
          required: false,
          schema: {
            type: 'string'
          }
        }, {
          name: 'password',
          in: 'query',
          description: 'The password for login in clear text',
          required: false,
          schema: {
            type: 'string'
          }
        }],
        responses: {
          200: {
            description: 'successful operation',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                description: 'date in UTC when token expires',
                schema: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            },
            content: {
              'application/xml': {
                schema: {
                  type: 'string'
                }
              },
              'application/json': {
                schema: {
                  type: 'string'
                }
              }
            }
          },
          400: {
            description: 'Invalid username/password supplied'
          }
        }
      }
    },
    '/user/logout': {
      get: {
        tags: ['user'],
        summary: 'Logs out current logged in user session',
        description: '',
        operationId: 'logoutUser',
        parameters: [],
        responses: {
          default: {
            description: 'successful operation'
          }
        }
      }
    },
    '/user/{username}': {
      get: {
        tags: ['user'],
        summary: 'Get user by user name',
        description: '',
        operationId: 'getUserByName',
        parameters: [{
          name: 'username',
          in: 'path',
          description: 'The name that needs to be fetched. Use user1 for testing. ',
          required: true,
          schema: {
            type: 'string'
          }
        }],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          400: {
            description: 'Invalid username supplied'
          },
          404: {
            description: 'User not found'
          }
        }
      },
      put: {
        tags: ['user'],
        summary: 'Update user',
        description: 'This can only be done by the logged in user.',
        operationId: 'updateUser',
        parameters: [{
          name: 'username',
          in: 'path',
          description: 'name that need to be deleted',
          required: true,
          schema: {
            type: 'string'
          }
        }],
        requestBody: {
          description: 'Update an existent user in the store',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        responses: {
          default: {
            description: 'successful operation'
          }
        }
      },
      delete: {
        tags: ['user'],
        summary: 'Delete user',
        description: 'This can only be done by the logged in user.',
        operationId: 'deleteUser',
        parameters: [{
          name: 'username',
          in: 'path',
          description: 'The name that needs to be deleted',
          required: true,
          schema: {
            type: 'string'
          }
        }],
        responses: {
          400: {
            description: 'Invalid username supplied'
          },
          404: {
            description: 'User not found'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Order: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 10
          },
          petId: {
            type: 'integer',
            format: 'int64',
            example: 198772
          },
          quantity: {
            type: 'integer',
            format: 'int32',
            example: 7
          },
          shipDate: {
            type: 'string',
            format: 'date-time'
          },
          status: {
            type: 'string',
            description: 'Order Status',
            example: 'approved',
            enum: ['placed', 'approved', 'delivered']
          },
          complete: {
            type: 'boolean'
          }
        },
        xml: {
          name: 'order'
        }
      },
      Customer: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 100000
          },
          username: {
            type: 'string',
            example: 'fehguy'
          },
          address: {
            type: 'array',
            xml: {
              name: 'addresses',
              wrapped: true
            },
            items: {
              $ref: '#/components/schemas/Address'
            }
          }
        },
        xml: {
          name: 'customer'
        }
      },
      Address: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
            example: '437 Lytton'
          },
          city: {
            type: 'string',
            example: 'Palo Alto'
          },
          state: {
            type: 'string',
            example: 'CA'
          },
          zip: {
            type: 'string',
            example: '94301'
          }
        },
        xml: {
          name: 'address'
        }
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 1
          },
          name: {
            type: 'string',
            example: 'Dogs'
          }
        },
        xml: {
          name: 'category'
        }
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 10
          },
          username: {
            type: 'string',
            example: 'theUser'
          },
          firstName: {
            type: 'string',
            example: 'John'
          },
          lastName: {
            type: 'string',
            example: 'James'
          },
          email: {
            type: 'string',
            example: 'john@email.com'
          },
          password: {
            type: 'string',
            example: '12345'
          },
          phone: {
            type: 'string',
            example: '12345'
          },
          userStatus: {
            type: 'integer',
            description: 'User Status',
            format: 'int32',
            example: 1
          }
        },
        xml: {
          name: 'user'
        }
      },
      Tag: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64'
          },
          name: {
            type: 'string'
          }
        },
        xml: {
          name: 'tag'
        }
      },
      Pet: {
        required: ['name', 'photoUrls'],
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 10
          },
          name: {
            type: 'string',
            example: 'doggie'
          },
          category: {
            $ref: '#/components/schemas/Category'
          },
          photoUrls: {
            type: 'array',
            xml: {
              wrapped: true
            },
            items: {
              type: 'string',
              xml: {
                name: 'photoUrl'
              }
            }
          },
          tags: {
            type: 'array',
            xml: {
              wrapped: true
            },
            items: {
              $ref: '#/components/schemas/Tag'
            }
          },
          status: {
            type: 'string',
            description: 'pet status in the store',
            enum: ['available', 'pending', 'sold']
          }
        },
        xml: {
          name: 'pet'
        }
      },
      ApiResponse: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            format: 'int32'
          },
          type: {
            type: 'string'
          },
          message: {
            type: 'string'
          }
        },
        xml: {
          name: '##default'
        }
      }
    },
    requestBodies: {
      Pet: {
        description: 'Pet object that needs to be added to the store',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          },
          'application/xml': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          }
        }
      },
      UserArray: {
        description: 'List of user object',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        }
      }
    },
    securitySchemes: {
      petstore_auth: {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'https://petstore3.apidocpro.com/login',
            scopes: {
              'write:pets': 'modify pets in your account',
              'read:pets': 'read your pets'
            }
          }
        }
      },
      api_key: {
        type: 'apiKey',
        name: 'api_key',
        in: 'header'
      }
    }
  }
};
export { jsonExample, yamlExample };