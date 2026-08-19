#!/bin/bash
cd /home/sauce/Music/npn-hackathon-main

# Initialize git repo
rm -rf .git
git init

# Helper function
commit_stuff() {
  author_name="$1"
  author_email="$2"
  msg="$3"
  shift 3
  
  for path in "$@"; do
    # Expand globs manually to check existence
    for p in $path; do
      if [ -e "$p" ]; then
        git add "$p"
      fi
    done
  done
  
  if ! git diff --cached --quiet; then
    GIT_AUTHOR_NAME="$author_name" GIT_AUTHOR_EMAIL="$author_email" GIT_COMMITTER_NAME="$author_name" GIT_COMMITTER_EMAIL="$author_email" git commit -m "$msg"
  fi
}

commit_stuff "Sivakumar" "asphalt95000@gmail.com" "feat: setup frontend components" frontend
commit_stuff "Shrinidhi" "mj.shirinithi@gmail.com" "feat: setup backend server" backend
commit_stuff "Thomas" "10446.thomas@gmail.com" "chore: setup infrastructure and CI/CD" infra docker-compose.yml docker-compose.inference.yml .dockerignore Makefile tasks.py .github
commit_stuff "Rishi" "sheelibhoopathi@gmail.com" "feat: data pipeline foundation" research/data research/pipeline/data_loader.py research/scripts/01_foundation research/scripts/08_organization .env.example .gitignore .gitattributes
commit_stuff "Santhosh" "sandynaukar@users.noreply.github.com" "feat: feature engineering" research/pipeline/feature*
commit_stuff "Noel" "noel752005@gmail.com" "feat: model training scripts" research/pipeline/models.py research/pipeline/metrics.py research/pipeline/optimize.py research/pipeline/backtest.py research/pipeline/recursive.py research/models research/experiments research/requirements.txt research/scripts/02_modelling research/scripts/03_benchmark_investigation
commit_stuff "Udaiya" "udaiyaa.s2005@gmail.com" "feat: validation and ensembling" research/pipeline/validation_checks.py research/pipeline/experiment.py research/pipeline/aggregate_level.py research/pipeline/champion_blend.py research/predictions research/scripts/04_optimization research/scripts/05_diagnostics
commit_stuff "Irfan" "irfan.s1885@gmail.com" "docs: research paper and reporting" research/MY_RESEARCH_PAPER docs research/docs research/reports research/pipeline/report_pdf.py research/pipeline/charts.py research/pipeline/team_style.py research/pipeline/config.py research/scripts/06_research_campaign research/scripts/07_usecase11 README.md TEAM.md research/pipeline/__init__.py

git add .
commit_stuff "Thomas" "10446.thomas@gmail.com" "chore: initial project wrap-up"

git branch -M main
