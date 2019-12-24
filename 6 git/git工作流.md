# Git 工作流

## 简介

Gitflow 为不同的分支分配一个很明确的角色，并定义分支之间如何和什么时候进行交互。分别有历史分支、功能分支、发布分支和维护分支。

- 历史分支

使用两个分支来记录项目的历史。 master 分支记录了正式发布的历史，而 develop 分支作为功能的集成分支。因此，master 分支的每次提交都应分配一个版本号。

- 功能分支

功能分支是从 master 中 checkout 出来的新分支，每个功能对应一个分支。

```
假设开发a功能：

git checkout -b feature-a develop

当新功能完成时，合并回develop分支进行测试和发布。

git checkout develop
git merge --no-ff feature-a
git push
git branch -d feature-a
```

## GitHub Flow

GitHub 使用的工作流

1. 所有在 master 上的东西都是可发布的（已发布或马上发布）
1. 开发新功能时，从 master 拉一个名称清晰的新分支
1. 在本地提交到这个分支的同时把它 push 到远程仓库
1. 当你需要得到反馈或帮助，或者该分支准备 merge 时，打开一个 pull request
1. 该分支被 review 且同意合并后，合并到 master
1. push 到 master 后，应该立即发布

## Git-Develop

develop 作为固定的持续集成和发布分支

1. 每一个功能都从 master 拉一个功能分支。
1. 在这个功能分支上开发，功能完成到发布时，提交 code review，通过后自动合并到 develop。
1. 待所有计划发布的变更分支代码都合并到 develop 后，rebase master 到 develop，完成发布。
1. 应用发布成功后打一个 tag。
1. develop 分支的发布版本合并回 master。

## Pull Requests

Pull requests 不是一种工作流，而是一个能让开发者更方便地进行协作的功能，可以在提议的修改合并到正式项目之前对修改进行讨论。这种方式对分支的合并有一些限制，例如只有项目维护者有权限合并分支到仓库中。其工作方式：

1. 开发者在本地仓库新建一个功能分支。
1. 功能完成后，开发者 push 分支修改到远程仓库中。
1. 开发者发起 Pull requests。
1. 团队成员收到通知，进行 code review，讨论和修改。
1. 项目维护者合并功能到仓库中并关闭 Pull Requests。

## 参考资料

[Pro Git，Git 工具书 http://iissnan.com/progit/html/zh/ch1_5.html](http://iissnan.com/progit/html/zh/ch1_5.html)

[Git 工作流指南，介绍了几种主流工作流： https://github.com/xirong/my-git/blob/master/git-workflow-tutorial.md](https://github.com/xirong/my-git/blob/master/git-workflow-tutorial.md)

[Gitflow 有害论： http://insights.thoughtworkers.org/gitflow-consider-harmful/](http://insights.thoughtworkers.org/gitflow-consider-harmful/)

[GitHub Flow： http://scottchacon.com/2011/08/31/github-flow.html](http://scottchacon.com/2011/08/31/github-flow.html)

[Google 的“主干开发”（trunk-based development）： http://www.ruanyifeng.com/blog/2016/07/google-monolithic-source-repository.html](http://www.ruanyifeng.com/blog/2016/07/google-monolithic-source-repository.html)
