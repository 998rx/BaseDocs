---
title: Introduction
createTime: 2025/08/11 10:44:51
permalink: /en/article/y4dci7hc/
---
# Getting Started

VuePress is a Markdown-centric static site generator. You can use [Markdown](https://en.wikipedia.org/wiki/Markdown) to write content (like documentation, blogs, etc.), and VuePress will help you generate a static site to showcase them.

## How it works?

A VuePress site is essentially a Single-Page Application (SPA) powered by [Vue](https://vuejs.org/) and [Vue Router](https://router.vuejs.org).

Routes are automatically generated based on the relative paths of your Markdown files. Each Markdown file is compiled into HTML via [markdown-it](https://github.com/markdown-it/markdown-it) and then used as a Vue component template.

## Features

- Built-in Markdown extensions
- Vue-powered custom theme system
- Plugin API
- Default theme optimized for technical documentation

## Quick Start

```bash
npm install vuepress@next
```

Create your first document:

```markdown
# Hello VuePress

Welcome to your VuePress site!
```

### 组件
<Rate></Rate>