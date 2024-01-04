# Variables
SRC_DIR := src
BUILD_DIR := dist
TARGET := maze
WEBPACK := npx webpack --config webpack.config.js

# Compiler and flags
CC := tsc
CFLAGS := --outDir $(BUILD_DIR)

# Source files
SRCS := $(wildcard $(SRC_DIR)/*.ts)
OBJS := $(patsubst $(SRC_DIR)/%.ts,$(BUILD_DIR)/%.js,$(SRCS))

# Default target
all: $(OBJS)

# Compile TypeScript files
$(BUILD_DIR)/%.js: $(SRC_DIR)/%.ts
	$(CC) $(CFLAGS) $<

# Webpack target
webpack: all
	$(WEBPACK)

.PHONY: all webpack
