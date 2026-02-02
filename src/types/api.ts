/**
 * Generic API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  timestamp?: string
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  success: false
  error: string
  message: string
  statusCode?: number
  details?: unknown
  timestamp?: string
}

/**
 * Paginated API Response
 */
export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  message?: string
}

/**
 * API List Response (without pagination)
 */
export interface ListResponse<T> {
  success: boolean
  data: T[]
  total: number
  message?: string
}

/**
 * Empty success response
 */
export interface SuccessResponse {
  success: true
  message: string
}

/**
 * Login Request
 */
export interface LoginRequest {
  username: string
  password: string
}

/**
 * Login Response Data
 */
export interface LoginResponseData {
  access_token: string
  refresh_token: string
  user: UserProfileData
}

/**
 * Register Request
 */
export interface RegisterRequest {
  email: string
  password: string
  name: string
}

/**
 * Refresh Token Request
 */
export interface RefreshTokenRequest {
  refresh_token: string
}

/**
 * Refresh Token Response Data
 */
export interface RefreshTokenResponseData {
  access_token: string
  refresh_token: string
}

/**
 * User Profile Data
 */
export interface UserProfileData {
  id: string
  email: string
  name?: string
  avatar?: string
  created_at?: string
  updated_at?: string
}
