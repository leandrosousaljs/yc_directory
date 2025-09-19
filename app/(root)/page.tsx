import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';

import StartupCard, { StartupCardType } from '@/components/StartupCard';
import SearchForm from '../../components/SearchForm';

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <p className="tag">Faça seu pitch, vote e cresça</p>
        <h1 className="heading">
          Apresente sua startup, <br /> conecte-se com empreendedores
        </h1>
        <p className="sub-heading !max-w-3xl">
          Envie ideias, vote nos pitches e ganhe visibilidade para sua startup.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">{query ? `Resultados da pesquisa por \"${query}\"` : 'Todas as startups'}</p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => <StartupCard key={post._id} post={post} />)
          ) : (
            <p className="no-results">Nenhuma Startup Encontrada</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
