SRC_DIR := src
OUT_DIR := out
SOURCES := $(wildcard $(SRC_DIR)/*.md)
OUTPUTS := $(patsubst $(SRC_DIR)/%.md,$(OUT_DIR)/%.html,$(SOURCES))

.PHONY: all deps check build lint test package clean ci

all: ci

node_modules: package.json package-lock.json
	npm ci

deps: node_modules

check:
	@test -d "$(SRC_DIR)" || (echo "CHECK FAILED: source directory missing"; exit 1)
	@test -n "$(SOURCES)" || (echo "CHECK FAILED: no Markdown files found"; exit 1)
	@echo "CHECK PASSED: $(words $(SOURCES)) Markdown source file(s) found"

$(OUT_DIR):
	mkdir -p $(OUT_DIR)

$(OUT_DIR)/%.html: $(SRC_DIR)/%.md | $(OUT_DIR)
	@echo "BUILD $< -> $@"
	npm run build -- $< $@

build: $(OUTPUTS)

lint: node_modules
	npm run --silent lint

test: build
	npm test

package: test
	npm pack
	@echo "PACKAGE CREATED"

clean:
	rm -rf $(OUT_DIR) *.tgz

ci: clean deps check lint test package
