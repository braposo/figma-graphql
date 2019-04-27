set -e

echo "Linting"
yarn lint
echo "\n\n"

echo "Running tests"
yarn test --coverage && codecov
echo "\n\n"