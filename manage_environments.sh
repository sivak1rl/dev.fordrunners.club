#!/bin/bash

# Environment management script for Ford Runners Club

show_help() {
    echo "Usage: $0 [command] [environment]"
    echo ""
    echo "Commands:"
    echo "  start       Start the specified environment"
    echo "  stop        Stop the specified environment"
    echo "  restart     Restart the specified environment"
    echo "  rebuild     Rebuild and restart the specified environment"
    echo "  logs        Show logs for the specified environment"
    echo "  setup-certs Setup initial SSL certificates"
    echo "  renew-certs Force renewal of SSL certificates"
    echo "  cert-status Check SSL certificate status"
    echo ""
    echo "Environments:"
    echo "  prod        Production environment (fordrunners.club)"
    echo "  dev         Development environment (dev.fordrunners.club)"
    echo "  local       Local development (no domain required, http://localhost:3000)"
    echo "  all         Both production and development environments"
    echo ""
    echo "Examples:"
    echo "  $0 start prod     Start production environment"
    echo "  $0 rebuild dev    Rebuild and restart development environment"
    echo "  $0 start local    Start local development environment"
    echo "  $0 stop all       Stop both environments"
    echo "  $0 setup-certs    Create initial SSL certificates"
}

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Error: docker-compose is not installed."
    exit 1
fi

# SSL certificate commands don't need environment parameter
if [[ "$1" == "setup-certs" || "$1" == "renew-certs" || "$1" == "cert-status" ]]; then
    case "$1" in
        setup-certs)
            echo "Setting up initial SSL certificates..."
            docker-compose --profile setup up certbot-initial
            ;;
        renew-certs)
            echo "Forcing renewal of SSL certificates..."
            docker-compose exec certbot certbot renew --force-renewal
            ;;
        cert-status)
            echo "Checking SSL certificate status..."
            docker-compose exec certbot certbot certificates
            ;;
    esac
    echo "Done!"
    exit 0
fi

# Check for correct number of arguments for other commands
if [ $# -lt 2 ]; then
    show_help
    exit 1
fi

COMMAND=$1
ENV=$2

# Validate environment
if [[ "$ENV" != "prod" && "$ENV" != "dev" && "$ENV" != "local" && "$ENV" != "all" ]]; then
    echo "Error: Invalid environment. Use 'prod', 'dev', 'local', or 'all'."
    show_help
    exit 1
fi

# Define services based on environment
if [[ "$ENV" == "prod" ]]; then
    SERVICES="frontend backend certbot"
elif [[ "$ENV" == "dev" ]]; then
    SERVICES="frontend-dev backend-dev"
elif [[ "$ENV" == "local" ]]; then
    SERVICES="--profile local frontend-local backend-local"
    PROFILE_FLAG="--profile local"
else
    SERVICES=""  # All services for 'all'
    PROFILE_FLAG=""
fi

# Execute command
case "$COMMAND" in
    start)
        echo "Starting $ENV environment..."
        if [[ "$ENV" == "local" ]]; then
            docker-compose $PROFILE_FLAG up -d $SERVICES
            echo ""
            echo "✅ Local environment started!"
            echo "📱 Frontend: http://localhost:3000"
            echo "🔌 Backend API: http://localhost:5002/api"
            echo ""
        elif [[ "$ENV" == "all" ]]; then
            docker-compose up -d
        else
            docker-compose up -d $SERVICES
        fi
        ;;
    stop)
        echo "Stopping $ENV environment..."
        if [[ "$ENV" == "local" ]]; then
            docker-compose $PROFILE_FLAG down
        elif [[ "$ENV" == "all" ]]; then
            docker-compose down
        else
            docker-compose stop $SERVICES
        fi
        ;;
    restart)
        echo "Restarting $ENV environment..."
        if [[ "$ENV" == "local" ]]; then
            docker-compose $PROFILE_FLAG restart $SERVICES
        elif [[ "$ENV" == "all" ]]; then
            docker-compose restart
        else
            docker-compose restart $SERVICES
        fi
        ;;
    rebuild)
        echo "Rebuilding $ENV environment..."
        if [[ "$ENV" == "local" ]]; then
            docker-compose $PROFILE_FLAG build $SERVICES && docker-compose $PROFILE_FLAG down && docker-compose $PROFILE_FLAG up -d $SERVICES
            echo ""
            echo "✅ Local environment rebuilt and started!"
            echo "📱 Frontend: http://localhost:3000"
            echo "🔌 Backend API: http://localhost:5002/api"
            echo ""
        elif [[ "$ENV" == "all" ]]; then
            docker-compose build && docker-compose down && docker-compose up -d
        else
            docker-compose build $SERVICES && docker-compose stop $SERVICES && docker-compose up -d $SERVICES
        fi
        ;;
    logs)
        echo "Showing logs for $ENV environment..."
        if [[ "$ENV" == "local" ]]; then
            docker-compose $PROFILE_FLAG logs -f $SERVICES
        elif [[ "$ENV" == "all" ]]; then
            docker-compose logs -f
        else
            docker-compose logs -f $SERVICES
        fi
        ;;
    *)
        echo "Error: Invalid command."
        show_help
        exit 1
        ;;
esac

echo "Done!"