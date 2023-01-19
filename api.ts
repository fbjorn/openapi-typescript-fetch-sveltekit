/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/pet': {
    /**
     * Update an existing pet
     * @description Update an existing pet by Id
     */
    put: operations['updatePet']
    /**
     * Add a new pet to the store
     * @description Add a new pet to the store
     */
    post: operations['addPet']
  }
  '/pet/findByStatus': {
    /**
     * Finds Pets by status
     * @description Multiple status values can be provided with comma separated strings
     */
    get: operations['findPetsByStatus']
  }
  '/pet/findByTags': {
    /**
     * Finds Pets by tags
     * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
     */
    get: operations['findPetsByTags']
  }
  '/pet/{petId}': {
    /**
     * Find pet by ID
     * @description Returns a single pet
     */
    get: operations['getPetById']
    /** Updates a pet in the store with form data */
    post: operations['updatePetWithForm']
    /** Deletes a pet */
    delete: operations['deletePet']
  }
  '/pet/{petId}/uploadImage': {
    /** uploads an image */
    post: operations['uploadFile']
  }
  '/store/inventory': {
    /**
     * Returns pet inventories by status
     * @description Returns a map of status codes to quantities
     */
    get: operations['getInventory']
  }
  '/store/order': {
    /**
     * Place an order for a pet
     * @description Place a new order in the store
     */
    post: operations['placeOrder']
  }
  '/store/order/{orderId}': {
    /**
     * Find purchase order by ID
     * @description For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
     */
    get: operations['getOrderById']
    /**
     * Delete purchase order by ID
     * @description For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
     */
    delete: operations['deleteOrder']
  }
  '/user': {
    /**
     * Create user
     * @description This can only be done by the logged in user.
     */
    post: operations['createUser']
  }
  '/user/createWithList': {
    /**
     * Creates list of users with given input array
     * @description Creates list of users with given input array
     */
    post: operations['createUsersWithListInput']
  }
  '/user/login': {
    /** Logs user into the system */
    get: operations['loginUser']
  }
  '/user/logout': {
    /** Logs out current logged in user session */
    get: operations['logoutUser']
  }
  '/user/{username}': {
    /** Get user by user name */
    get: operations['getUserByName']
    /**
     * Update user
     * @description This can only be done by the logged in user.
     */
    put: operations['updateUser']
    /**
     * Delete user
     * @description This can only be done by the logged in user.
     */
    delete: operations['deleteUser']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    Order: {
      /**
       * Format: int64
       * @example 10
       */
      id?: number
      /**
       * Format: int64
       * @example 198772
       */
      petId?: number
      /**
       * Format: int32
       * @example 7
       */
      quantity?: number
      /** Format: date-time */
      shipDate?: string
      /**
       * @description Order Status
       * @example approved
       * @enum {string}
       */
      status?: 'placed' | 'approved' | 'delivered'
      complete?: boolean
    }
    Customer: {
      /**
       * Format: int64
       * @example 100000
       */
      id?: number
      /** @example fehguy */
      username?: string
      address?: components['schemas']['Address'][]
    }
    Address: {
      /** @example 437 Lytton */
      street?: string
      /** @example Palo Alto */
      city?: string
      /** @example CA */
      state?: string
      /** @example 94301 */
      zip?: string
    }
    Category: {
      /**
       * Format: int64
       * @example 1
       */
      id?: number
      /** @example Dogs */
      name?: string
    }
    User: {
      /**
       * Format: int64
       * @example 10
       */
      id?: number
      /** @example theUser */
      username?: string
      /** @example John */
      firstName?: string
      /** @example James */
      lastName?: string
      /** @example john@email.com */
      email?: string
      /** @example 12345 */
      password?: string
      /** @example 12345 */
      phone?: string
      /**
       * Format: int32
       * @description User Status
       * @example 1
       */
      userStatus?: number
    }
    Tag: {
      /** Format: int64 */
      id?: number
      name?: string
    }
    Pet: {
      /**
       * Format: int64
       * @example 10
       */
      id?: number
      /** @example doggie */
      name: string
      category?: components['schemas']['Category']
      photoUrls: string[]
      tags?: components['schemas']['Tag'][]
      /**
       * @description pet status in the store
       * @enum {string}
       */
      status?: 'available' | 'pending' | 'sold'
    }
    ApiResponse: {
      /** Format: int32 */
      code?: number
      type?: string
      message?: string
    }
  }
  responses: never
  parameters: never
  requestBodies: {
    /** @description Pet object that needs to be added to the store */
    Pet?: {
      content: {
        'application/json': components['schemas']['Pet']
        'application/xml': components['schemas']['Pet']
      }
    }
    /** @description List of user object */
    UserArray?: {
      content: {
        'application/json': components['schemas']['User'][]
      }
    }
  }
  headers: never
  pathItems: never
}

export type external = Record<string, never>

export interface operations {
  updatePet: {
    /**
     * Update an existing pet
     * @description Update an existing pet by Id
     */
    /** @description Update an existent pet in the store */
    requestBody: {
      content: {
        'application/json': components['schemas']['Pet']
        'application/xml': components['schemas']['Pet']
        'application/x-www-form-urlencoded': components['schemas']['Pet']
      }
    }
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          'application/xml': components['schemas']['Pet']
          'application/json': components['schemas']['Pet']
        }
      }
      /** @description Invalid ID supplied */
      400: never
      /** @description Pet not found */
      404: never
      /** @description Validation exception */
      405: never
    }
  }
  addPet: {
    /**
     * Add a new pet to the store
     * @description Add a new pet to the store
     */
    /** @description Create a new pet in the store */
    requestBody: {
      content: {
        'application/json': components['schemas']['Pet']
        'application/xml': components['schemas']['Pet']
        'application/x-www-form-urlencoded': components['schemas']['Pet']
      }
    }
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          'application/xml': components['schemas']['Pet']
          'application/json': components['schemas']['Pet']
        }
      }
      /** @description Invalid input */
      405: never
    }
  }
  findPetsByStatus: {
    /**
     * Finds Pets by status
     * @description Multiple status values can be provided with comma separated strings
     */
    parameters?: {
      /** @description Status values that need to be considered for filter */
      query?: {
        status?: 'available' | 'pending' | 'sold'
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/xml': components['schemas']['Pet'][]
          'application/json': components['schemas']['Pet'][]
        }
      }
      /** @description Invalid status value */
      400: never
    }
  }
  findPetsByTags: {
    /**
     * Finds Pets by tags
     * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
     */
    parameters?: {
      /** @description Tags to filter by */
      query?: {
        tags?: string[]
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/xml': components['schemas']['Pet'][]
          'application/json': components['schemas']['Pet'][]
        }
      }
      /** @description Invalid tag value */
      400: never
    }
  }
  getPetById: {
    /**
     * Find pet by ID
     * @description Returns a single pet
     */
    parameters: {
      /** @description ID of pet to return */
      path: {
        petId: number
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/xml': components['schemas']['Pet']
          'application/json': components['schemas']['Pet']
        }
      }
      /** @description Invalid ID supplied */
      400: never
      /** @description Pet not found */
      404: never
    }
  }
  updatePetWithForm: {
    /** Updates a pet in the store with form data */
    parameters: {
      /** @description Name of pet that needs to be updated */
      /** @description Status of pet that needs to be updated */
      query?: {
        name?: string
        status?: string
      }
      /** @description ID of pet that needs to be updated */
      path: {
        petId: number
      }
    }
    responses: {
      /** @description Invalid input */
      405: never
    }
  }
  deletePet: {
    /** Deletes a pet */
    parameters: {
      header?: {
        api_key?: string
      }
      /** @description Pet id to delete */
      path: {
        petId: number
      }
    }
    responses: {
      /** @description Invalid pet value */
      400: never
    }
  }
  uploadFile: {
    /** uploads an image */
    parameters: {
      /** @description Additional Metadata */
      query?: {
        additionalMetadata?: string
      }
      /** @description ID of pet to update */
      path: {
        petId: number
      }
    }
    requestBody?: {
      content: {
        'application/octet-stream': string
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['ApiResponse']
        }
      }
    }
  }
  getInventory: {
    /**
     * Returns pet inventories by status
     * @description Returns a map of status codes to quantities
     */
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': {
            [key: string]: number | undefined
          }
        }
      }
    }
  }
  placeOrder: {
    /**
     * Place an order for a pet
     * @description Place a new order in the store
     */
    requestBody?: {
      content: {
        'application/json': components['schemas']['Order']
        'application/xml': components['schemas']['Order']
        'application/x-www-form-urlencoded': components['schemas']['Order']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['Order']
        }
      }
      /** @description Invalid input */
      405: never
    }
  }
  getOrderById: {
    /**
     * Find purchase order by ID
     * @description For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
     */
    parameters: {
      /** @description ID of order that needs to be fetched */
      path: {
        orderId: number
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/xml': components['schemas']['Order']
          'application/json': components['schemas']['Order']
        }
      }
      /** @description Invalid ID supplied */
      400: never
      /** @description Order not found */
      404: never
    }
  }
  deleteOrder: {
    /**
     * Delete purchase order by ID
     * @description For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
     */
    parameters: {
      /** @description ID of the order that needs to be deleted */
      path: {
        orderId: number
      }
    }
    responses: {
      /** @description Invalid ID supplied */
      400: never
      /** @description Order not found */
      404: never
    }
  }
  createUser: {
    /**
     * Create user
     * @description This can only be done by the logged in user.
     */
    /** @description Created user object */
    requestBody?: {
      content: {
        'application/json': components['schemas']['User']
        'application/xml': components['schemas']['User']
        'application/x-www-form-urlencoded': components['schemas']['User']
      }
    }
    responses: {
      /** @description successful operation */
      default: {
        content: {
          'application/json': components['schemas']['User']
          'application/xml': components['schemas']['User']
        }
      }
    }
  }
  createUsersWithListInput: {
    /**
     * Creates list of users with given input array
     * @description Creates list of users with given input array
     */
    requestBody?: {
      content: {
        'application/json': components['schemas']['User'][]
      }
    }
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          'application/xml': components['schemas']['User']
          'application/json': components['schemas']['User']
        }
      }
      /** @description successful operation */
      default: never
    }
  }
  loginUser: {
    /** Logs user into the system */
    parameters?: {
      /** @description The user name for login */
      /** @description The password for login in clear text */
      query?: {
        username?: string
        password?: string
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        headers: {
          /** @description calls per hour allowed by the user */
          'X-Rate-Limit'?: number
          /** @description date in UTC when token expires */
          'X-Expires-After'?: string
        }
        content: {
          'application/xml': string
          'application/json': string
        }
      }
      /** @description Invalid username/password supplied */
      400: never
    }
  }
  logoutUser: {
    /** Logs out current logged in user session */
    responses: {
      /** @description successful operation */
      default: never
    }
  }
  getUserByName: {
    /** Get user by user name */
    parameters: {
      /** @description The name that needs to be fetched. Use user1 for testing. */
      path: {
        username: string
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/xml': components['schemas']['User']
          'application/json': components['schemas']['User']
        }
      }
      /** @description Invalid username supplied */
      400: never
      /** @description User not found */
      404: never
    }
  }
  updateUser: {
    /**
     * Update user
     * @description This can only be done by the logged in user.
     */
    parameters: {
      /** @description name that need to be deleted */
      path: {
        username: string
      }
    }
    /** @description Update an existent user in the store */
    requestBody?: {
      content: {
        'application/json': components['schemas']['User']
        'application/xml': components['schemas']['User']
        'application/x-www-form-urlencoded': components['schemas']['User']
      }
    }
    responses: {
      /** @description successful operation */
      default: never
    }
  }
  deleteUser: {
    /**
     * Delete user
     * @description This can only be done by the logged in user.
     */
    parameters: {
      /** @description The name that needs to be deleted */
      path: {
        username: string
      }
    }
    responses: {
      /** @description Invalid username supplied */
      400: never
      /** @description User not found */
      404: never
    }
  }
}