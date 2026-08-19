#!/bin/bash
cd /home/sauce/Music/npn-hackathon-main

# Reset git
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

# 1. Frontend 1
commit_stuff "Sivakumar" "asphalt95000@gmail.com" "feat: init frontend app" frontend/package.json frontend/tsconfig.json frontend/next.config.js frontend/public frontend/app
# 2. Frontend 2
commit_stuff "Sivakumar" "asphalt95000@gmail.com" "feat: setup frontend components and libs" frontend/src

# 3. Backend 1
commit_stuff "Shrinidhi" "mj.shirinithi@gmail.com" "feat: base backend setup" backend/requirements.txt backend/Dockerfile backend/app/main.py
# 4. Backend 2
commit_stuff "Shrinidhi" "mj.shirinithi@gmail.com" "feat: backend api and core" backend/app/api backend/app/core backend/app/services

# 5. Devops 1
commit_stuff "Thomas" "10446.thomas@gmail.com" "chore: infrastructure basics" infra docker-compose.yml
# 6. Devops 2
commit_stuff "Thomas" "10446.thomas@gmail.com" "chore: inference docker setup" docker-compose.inference.yml .dockerignore
# 7. Devops 3
commit_stuff "Thomas" "10446.thomas@gmail.com" "chore: github actions and task runner" .github Makefile tasks.py

# 8. Data 1
commit_stuff "Rishi" "sheelibhoopathi@gmail.com" "feat: raw data and gitignore" research/data .gitignore
# 9. Data 2
commit_stuff "Rishi" "sheelibhoopathi@gmail.com" "feat: data loader implementation" research/pipeline/data_loader.py
# 10. Data 3
commit_stuff "Rishi" "sheelibhoopathi@gmail.com" "feat: project foundation scripts" research/scripts/01_foundation research/scripts/08_organization .env.example .gitattributes

# 11. Features 1
commit_stuff "Santhosh" "sandynaukar@users.noreply.github.com" "feat: core feature engineering" research/pipeline/features.py research/pipeline/feature_sets.py
# 12. Features 2
commit_stuff "Santhosh" "sandynaukar@users.noreply.github.com" "feat: advanced feature versions" research/pipeline/features_v*.py

# 13. ML 1
commit_stuff "Noel" "noel752005@gmail.com" "feat: base models and metrics" research/pipeline/models.py research/pipeline/metrics.py
# 14. ML 2
commit_stuff "Noel" "noel752005@gmail.com" "feat: optimization and backtesting" research/pipeline/optimize.py research/pipeline/backtest.py research/pipeline/recursive.py
# 15. ML 3
commit_stuff "Noel" "noel752005@gmail.com" "feat: modelling and benchmark investigations" research/models research/experiments/registry/model* research/scripts/02_modelling research/scripts/03_benchmark_investigation

# 16. ML 4
commit_stuff "Udaiya" "udaiyaa.s2005@gmail.com" "feat: validation and aggregation logic" research/pipeline/validation_checks.py research/pipeline/experiment.py research/pipeline/aggregate_level.py research/pipeline/champion_blend.py
# 17. ML 5
commit_stuff "Udaiya" "udaiyaa.s2005@gmail.com" "feat: diagnostics and optimization experiments" research/experiments/registry/opt* research/scripts/04_optimization research/scripts/05_diagnostics
# 18. ML 6
commit_stuff "Udaiya" "udaiyaa.s2005@gmail.com" "feat: requirements and experiment tracking" research/predictions research/requirements.txt research/experiments/registry/exp* research/experiments/registry/probe* research/experiments/registry/tune* research/experiments/registry/run*

# 19. GenAI 1
commit_stuff "Irfan" "irfan.s1885@gmail.com" "docs: research paper and core reports" research/MY_RESEARCH_PAPER docs research/docs research/reports
# 20. GenAI 2
commit_stuff "Irfan" "irfan.s1885@gmail.com" "docs: report generators and project docs" research/pipeline/report_pdf.py research/pipeline/charts.py research/pipeline/team_style.py research/pipeline/config.py research/scripts/06_research_campaign research/scripts/07_usecase11 README.md TEAM.md research/pipeline/__init__.py

# Add remaining files to a final catch-all commit by Devops (if any files were missed)
git add .
commit_stuff "Thomas" "10446.thomas@gmail.com" "chore: final project synchronization"

git branch -M main
git remote add origin https://github.com/iwinalbert/npn-hackathon-project.git
git push -f -u origin main
