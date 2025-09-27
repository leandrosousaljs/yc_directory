import { auth, signIn, signOut } from '@/auth';
import { BadgePlus, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Criar</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  'use server';

                  await signOut({ redirectTo: '/' });
                }}
              >
                <button className="cursor-pointer" type="submit">
                  <span className="max-sm:hidden">Sair</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <form
                action={async () => {
                  'use server';
                  await signIn('github');
                }}
              >
                <button
                  className="cursor-pointer inline-flex items-center justify-center size-9 rounded-md border hover:bg-muted"
                  type="submit"
                  aria-label="Entrar com GitHub"
                  title="Entrar com GitHub"
                >
                  <FaGithub className="size-5" />
                </button>
              </form>
              <form
                action={async () => {
                  'use server';
                  await signIn('google');
                }}
              >
                <button
                  className="cursor-pointer inline-flex items-center justify-center size-9 rounded-md border hover:bg-muted"
                  type="submit"
                  aria-label="Entrar com Google"
                  title="Entrar com Google"
                >
                  <FaGoogle className="size-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
