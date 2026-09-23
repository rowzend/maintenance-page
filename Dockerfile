FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments for environment variables
ARG NEXT_PUBLIC_MAINTENANCE_TITLE
ARG NEXT_PUBLIC_MAINTENANCE_SUBTITLE
ARG NEXT_PUBLIC_MAINTENANCE_WHAT
ARG NEXT_PUBLIC_MAINTENANCE_WHEN
ARG NEXT_PUBLIC_MAINTENANCE_ESTIMATED_TIME
ARG NEXT_PUBLIC_MAINTENANCE_CONTACT

# Set them as environment variables for the build
ENV NEXT_PUBLIC_MAINTENANCE_TITLE=$NEXT_PUBLIC_MAINTENANCE_TITLE
ENV NEXT_PUBLIC_MAINTENANCE_SUBTITLE=$NEXT_PUBLIC_MAINTENANCE_SUBTITLE
ENV NEXT_PUBLIC_MAINTENANCE_WHAT=$NEXT_PUBLIC_MAINTENANCE_WHAT
ENV NEXT_PUBLIC_MAINTENANCE_WHEN=$NEXT_PUBLIC_MAINTENANCE_WHEN
ENV NEXT_PUBLIC_MAINTENANCE_ESTIMATED_TIME=$NEXT_PUBLIC_MAINTENANCE_ESTIMATED_TIME
ENV NEXT_PUBLIC_MAINTENANCE_CONTACT=$NEXT_PUBLIC_MAINTENANCE_CONTACT

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
