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

# NEXT_PUBLIC_* vars are inlined at build time — pass them as build args
ARG NEXT_PUBLIC_POSTHOG_KEY
ARG NEXT_PUBLIC_POSTHOG_HOST
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG LEGAL_OPERATOR_NAME
ARG LEGAL_ADDRESS_LINE
ARG LEGAL_POSTAL_CODE_CITY
ARG LEGAL_COUNTRY
ARG LEGAL_CONTACT_EMAIL
ARG LEGAL_VAT_ID
ARG LEGAL_REGISTER_COURT
ARG LEGAL_REGISTER_NUMBER
ENV NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY}
ENV NEXT_PUBLIC_POSTHOG_HOST=${NEXT_PUBLIC_POSTHOG_HOST}
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}
ENV LEGAL_OPERATOR_NAME=${LEGAL_OPERATOR_NAME}
ENV LEGAL_ADDRESS_LINE=${LEGAL_ADDRESS_LINE}
ENV LEGAL_POSTAL_CODE_CITY=${LEGAL_POSTAL_CODE_CITY}
ENV LEGAL_COUNTRY=${LEGAL_COUNTRY}
ENV LEGAL_CONTACT_EMAIL=${LEGAL_CONTACT_EMAIL}
ENV LEGAL_VAT_ID=${LEGAL_VAT_ID}
ENV LEGAL_REGISTER_COURT=${LEGAL_REGISTER_COURT}
ENV LEGAL_REGISTER_NUMBER=${LEGAL_REGISTER_NUMBER}

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image — minimal standalone output
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Static assets must be copied explicitly — standalone does not include them
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
