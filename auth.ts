import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { AUTHOR_BY_PROVIDER_ID_QUERY } from './sanity/lib/queries';
import { client } from './sanity/lib/client';
import { writeClient } from './sanity/lib/write-client';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      const provider = account?.provider;
      const providerAccountId = account?.providerAccountId;
      if (!provider || !providerAccountId) return false;

      const externalId = `${provider}:${providerAccountId}`;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_PROVIDER_ID_QUERY, { id: externalId });

      if (!existingUser) {
        const name = user?.name ?? (profile as any)?.name ?? '';
        const email = user?.email ?? (profile as any)?.email ?? '';
        const image = user?.image ?? (profile as any)?.picture ?? '';
        const username =
          (profile as any)?.login ??
          (email ? email.split('@')[0] : (name?.toLowerCase().replaceAll(' ', '') ?? 'user'));

        await writeClient.create({
          _type: 'author',
          id: externalId,
          name,
          username,
          email,
          image,
          bio: (profile as any)?.bio ?? '',
        });
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        const externalId = `${account.provider}:${account.providerAccountId}`;
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_PROVIDER_ID_QUERY, { id: externalId });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
