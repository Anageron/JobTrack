import type { IOffer } from '../types/offer'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOfferStore = defineStore('offer', () => {
  const offers = ref<IOffer[]>([])

  async function fetchOffers() {
    // Моковые данные для демонстрации
    const mockOffers: IOffer[] = [
      {
        id: '1',
        direction: 'frontend',
        grade: 'middle',
        salaryMin: 150000,
        salaryMax: 250000,
        currency: 'RUB',
        company: 'Яндекс',
        vacancyLink: 'https://yandex.ru/jobs/vacancies/123',
        techStack: ['Vue', 'TypeScript', 'Node.js'],
        workFormat: 'hybrid',
        location: 'Москва',
        status: 'active',
        createdAt: '2025-04-01',
        notes: 'Отличная команда',
      },
      {
        id: '2',
        direction: 'backend',
        grade: 'senior',
        salaryMin: 300000,
        salaryMax: 400000,
        currency: 'RUB',
        company: 'Сбер',
        vacancyLink: 'https://sber.ru/careers/456',
        techStack: ['Java', 'Spring', 'Kafka'],
        workFormat: 'remote',
        location: 'Москва',
        status: 'inactive',
        createdAt: '2025-04-03',
        contactEmail: 'hr@sber.ru',
      },
    ]
    offers.value = mockOffers
  }

  function addOffer(offerData: Omit<IOffer, 'id' | 'createdAt'>) {
    const newOffer: IOffer = {
      ...offerData,
      id: Math.random().toString(36).slice(2, 11),
      createdAt: new Date().toISOString().split('T')[0]!,
    }
    offers.value.push(newOffer)
  }

  function updateOfferStatus(id: string, status: 'active' | 'inactive') {
    const offer = offers.value.find((o: IOffer) => o.id === id)
    if (offer) {
      offer.status = status
    }
  }

  return {
    offers,
    fetchOffers,
    addOffer,
    updateOfferStatus,
  }
})
