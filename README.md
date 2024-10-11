<<<<<<< HEAD
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
# �о����ܻ��õ��Ķ���

## git��ص�

### ����ڱ��ذ汾����

- `git log`�������չʾ���еİ汾�Ͱ汾�ţ���q�����˳�ҳ��
- ʹ�� `git reset --soft <�汾��>` ���Գ����ύ���������ظ���
- �� `soft`�ĳ� `hard`���ǲ��������ظ���
- �����ϣ�ִ�� `git push origin <��֧��> --force`����ǿ���ύָ���汾

  - ����ͨ�� `git branch`�鿴���ط�֧��ʲô
  - `git branch -a`���Բ鿴Զ�˷�֧
- ��������master��֧�Ǳ������ģ��ύ����ȥ
- ��֪�������master��֧ȡ�������ǲ���һ����ȷ������
- ��Ϣ��Դ��[(15����Ϣ) Gitlab �ع���ĳ��commit-CSDN����](https://blog.csdn.net/AlbenXie/article/details/125038678)

### ����ύcommit

- git add .
- git commit -m "����"
- git push

### ���ֻcommitһ���ļ�

- git commit �ļ��� -m ""

### ������ϴ�ʱ����ĳЩ�ļ�

- �����������ڵ��ļ����д��� `.gitignore`�ļ�
- ������ļ���ʹ���ض��﷨˵�������ϴ����߲��ϴ���Щ�ļ�
- �﷨����
  - `�ļ��е�·��/`��ʾ���ϴ�����ļ���
    - ����`node_modules/`
  - `*.��׺��`��ʾ���ϴ����ֺ�׺���ļ�
    - ����`*.zip`
  - `�ļ���.��׺`��ʾ���ϴ�����ļ�
    - ����`index.html`
- ��Ϣ��Դ��[(15����Ϣ) git�ϴ�����node_modules_git����node modules_����kkw�Ĳ���-CSDN����](https://blog.csdn.net/jiandan1127/article/details/81205530)

### ����޸�֮ǰcommit������

- ע���޸��൱�������ύһ��
- �� `git status`������Բ鿴���غͲֿ���˼���commit
- ʹ�� `git commit --amend`���Ե����޸���һ��commit��vim����
- ��Ϣ��Դ��[(15����Ϣ) git-�޸�commit��Ϣ_Muscleape�Ĳ���-CSDN����](https://blog.csdn.net/Muscleape/article/details/105637401)

### ��μ���Լ���ĳ��commit���޸��˶�����

git diff --shortstat �Ǵ�commit��hash��

## react��ص�

### �����ļ�������

- `/public`����ž�̬��Դ�ļ�
- `index.html`��ʵ��ҳ���ʾ������
- `package.json`����¼��Ŀ��������Ϣ��������Ϣ
- `package-lock.json`����¼��Ŀ�����ľ�ȷ�汾��Ϣ
- `.gitignore`��ѡ���ϴ����ļ�
- `/src`����Ҫʵ���ļ���Ŀ¼�����Ǹ��� `index.js`·���ᱨ��

  - `index.js`����ʼҳ��
  - `reportWebVitals.js`���ռ��ͱ�����ҳ����ָ��

    - ��֪����ʲô�ã�����ɾ��֮������ҵ�
  - `setupTests.js`����������Jest���ԣ���Ԫ���ԣ����
>>>>>>> e9a9ac370019255d8736ac40b2c7560a4cc425be
