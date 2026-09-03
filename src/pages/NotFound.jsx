import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';

import PageTransition from '../components/PageTransition';

const DESTINATIONS = [
  { to: '/archive', label: 'the Archive',    caption: 'Directory / Work' },
  { to: '/journal',   label: 'the Manifesto',  caption: 'Dispatches / Ongoing' },
  { to: '/contact',   label: 'the Uplink',     caption: 'Transmission / Open' },
];

const NotFound = () => (
  <PageTransition>
    <Helmet>
      <title>Signal Lost — Intellect Explorer</title>
      <meta name="description" content="This coordinate does not resolve. Return to the archive." />
      <meta name="robots" content="noindex" />
    </Helmet>

    <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-3xl mx-auto pb-40 relative z-10 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="font-mono text-[10px] md:text-xs text-blue-400 tracking-widest uppercase mb-4 block">
          Error / 404
        </span>

        <h1 className="font-serif text-5xl md:text-8xl text-white leading-none mb-8">
          Signal <span className="italic text-zinc-500">lost.</span>
        </h1>

        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed tracking-wide max-w-md mb-16">
          This coordinate does not resolve. The page was either moved, retired,
          or never filed in the first place.
        </p>

        <div className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {DESTINATIONS.map(({ to, label, caption }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300"
            >
              <div>
                <span className="font-mono text-[10px] text-zinc-600 group-hover:text-blue-400 uppercase tracking-widest mb-2 block transition-colors duration-300">
                  {caption}
                </span>
                <span className="font-serif text-xl md:text-2xl text-zinc-300 group-hover:text-white transition-colors duration-300">
                  Return to <span className="italic">{label}</span>
                </span>
              </div>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="flex-shrink-0 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
              />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  </PageTransition>
);

export default NotFound;
