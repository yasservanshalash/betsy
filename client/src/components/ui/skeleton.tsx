import React from 'react'
import { cn } from '../../lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse rounded-md bg-neutral-200/60',
          className
        )}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-soft border border-neutral-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-neutral-200 rounded-xl mb-4"></div>
      
      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="w-4 h-4 bg-neutral-200 rounded"></div>
          ))}
          <div className="h-4 bg-neutral-200 rounded w-8 ml-1"></div>
        </div>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-neutral-200 rounded w-16"></div>
          <div className="h-8 bg-neutral-200 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  )
}

export const ProductListSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100 animate-pulse">
      <div className="flex gap-6">
        {/* Image */}
        <div className="w-32 h-32 bg-neutral-200 rounded-xl flex-shrink-0"></div>
        
        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
            <div className="h-5 bg-neutral-200 rounded w-1/2"></div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="w-4 h-4 bg-neutral-200 rounded"></div>
            ))}
            <div className="h-4 bg-neutral-200 rounded w-8 ml-1"></div>
          </div>
          
          {/* Price and Controls */}
          <div className="flex items-center justify-between">
            <div className="h-8 bg-neutral-200 rounded w-20"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
              <div className="h-8 bg-neutral-200 rounded-full w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Popular Item Skeleton (replacement for PopularItemSkeleton)
export const PopularItemSkeleton: React.FC = () => {
  return (
    <div className="w-48 space-y-3">
      <Skeleton className="h-44 w-full rounded-lg" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
} 