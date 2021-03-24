import companyRepository from "@/api/repository/companyRepository"
import projectRegistrationRepository from "@/api/repository/projectRegistrationRepository"
import projectRepository from "@/api/repository/projectRepository"
import topicRepository from "@/api/repository/topicRepository"
import teacherRepository from "@/api/repository/teacherRepository"
import studentRepository from "@/api/repository/studentRepository"

const repositories = {
  company: companyRepository,
  projectRegistration: projectRegistrationRepository,
  project: projectRepository,
  topic: topicRepository,
  teacher: teacherRepository,
  student: studentRepository,
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
